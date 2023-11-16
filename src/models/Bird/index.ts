import { IRule } from '@/models/Rule';
import Alignment from '@/models/Rule/Basic/Alignment';
import Cohesion from '@/models/Rule/Basic/Cohesion';
import Separation from '@/models/Rule/Basic/Separation';
import { BirdConfig } from '@/types';
import { Size } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { IPredator } from '@/models/Predator';
import AvoidPredator from '@/models/Rule/Extension/AvoidPredator';
import AvoidObstacles from '@/models/Rule/Extension/AvoidObstacles';
import { IObstacle } from '@/models/Obstacle';

export interface IBird {
  pos: Vector3; // position
  vel: Vector3; // velocity
  acc: Vector3; // acceleration

  update(
    delta: number,
    size: Size,
    boids: IBird[],
    predators: IPredator[],
    obstacles: IObstacle[],
    config: BirdConfig
  ): void;
}

export class Bird implements IBird {
  pos: Vector3;
  vel: Vector3;
  acc: Vector3;

  rules: IRule[];

  static axisZ: Vector3 = new Vector3(0, 0, 1);

  constructor() {
    this.pos = new Vector3(0, 0, 0);
    this.vel = new Vector3(0, 0, 0);
    this.acc = new Vector3(0, 0, 0);

    this.rules = [
      new Alignment(),
      new Cohesion(),
      new Separation(),
      new AvoidObstacles(),
      new AvoidPredator(),
    ];
  }

  update(
    delta: number,
    size: Size,
    boids: IBird[],
    predators: IPredator[],
    obstacles: IObstacle[],
    config: BirdConfig
  ) {
    // reset acceleration
    this.acc.set(0, 0, 0);

    // find neighbors
    const neighbors = this.getNeighbors(boids, config);
    // apply rules
    this.applyRules(neighbors, predators, obstacles, config);

    // update velocity
    this.vel.add(this.acc.multiplyScalar(delta));
    // add noise to direction
    this.applyDirectionNoise(
      config.birdDirectionNoise,
      config.birdDirectionNoiseWeight
    );

    if (config.birdMaxSpeed > 0) this.limitSpeed(config.birdMaxSpeed);

    // bounce off edge
    if (config.bounceOffEdge) this.bounceOffEdge(size, config);

    // update position
    this.pos.set(
      this.pos.x + this.vel.x * delta,
      this.pos.y + this.vel.y * delta,
      this.pos.z + this.vel.z * delta
    );
    // wrap around the screen
    if (!config.bounceOffEdge) this.checkBoundaries(size);
  }

  applyRules(
    neighbors: IBird[],
    preds: IPredator[],
    obstacles: IObstacle[],
    config: BirdConfig
  ) {
    this.rules.forEach((rule) =>
      rule.apply(this, neighbors, preds, obstacles, config)
    );
  }

  limitSpeed(birdMaxSpeed: number) {
    if (this.vel.length() > birdMaxSpeed) {
      this.vel.normalize().multiplyScalar(birdMaxSpeed);
    }
  }

  applyDirectionNoise(
    birdDirectionNoise: number,
    birdDirectionNoiseWeight: number
  ) {
    if (birdDirectionNoise === 0 || birdDirectionNoiseWeight === 0) return;

    this.vel.applyAxisAngle(
      Bird.axisZ,
      MathUtils.degToRad(
        MathUtils.randFloat(-birdDirectionNoise, birdDirectionNoise)
      ) * birdDirectionNoiseWeight
    );
  }

  // bounce off edge
  bounceOffEdge(size: Size, config: BirdConfig) {
    const margin = config.bounceMargin;
    const turnFactor = config.bounceTurnFactor;
    if (this.pos.x < margin) this.vel.x += turnFactor;
    if (this.pos.x > size.width - margin) this.vel.x -= turnFactor;
    if (this.pos.y < margin) this.vel.y += turnFactor;
    if (this.pos.y > size.height - margin) this.vel.y -= turnFactor;
  }

  // boundless world
  checkBoundaries(size: Size) {
    if (this.pos.x > size.width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = size.width;
    if (this.pos.y > size.height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = size.height;
  }

  getNeighbors(boids: IBird[], config: BirdConfig): IBird[] {
    const neighbors: IBird[] = [];
    let distance: number;
    for (const bird of boids) {
      if (bird !== this) {
        distance = this.pos.distanceTo(bird.pos);

        if (distance < config.birdPerceivedRadius) {
          neighbors.push(bird);
          // accumulate basic rules, for efficiency
          for (const rule of this.rules) {
            if (rule.accumulate) rule.accumulate(this, bird, config);
          }
        }
      }
    }
    return neighbors;
  }
}
