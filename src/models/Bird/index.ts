import { IRule } from '@/models/Rule';
import Alignment from '@/models/Rule/Basic/Alignment';
import Cohesion from '@/models/Rule/Basic/Cohesion';
import Separation from '@/models/Rule/Basic/Separation';
import { BirdConfig, BirdStatus } from '@/types';
import { Size } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';

export interface IBird {
  pos: Vector3; // position
  vel: Vector3; // velocity
  acc: Vector3; // acceleration

  energy: number;
  maxEnergy: number;

  status: BirdStatus;

  update(delta: number, boids: IBird[], size: Size, config: BirdConfig): void;
}

export class Bird implements IBird {
  pos: Vector3;
  vel: Vector3;
  acc: Vector3;

  energy: number;
  maxEnergy: number;

  status: BirdStatus;

  basicRules: IRule[];

  static axisZ: Vector3 = new Vector3(0, 0, 1);

  constructor() {
    this.pos = new Vector3(0, 0, 0);
    this.vel = new Vector3(0, 0, 0);
    this.acc = new Vector3(0, 0, 0);

    this.energy = 0; // TODO
    this.maxEnergy = 0; // TODO
    this.status = BirdStatus.Flying; // TODO

    this.basicRules = [new Alignment(), new Cohesion(), new Separation()];
  }

  update(delta: number, boids: IBird[], size: Size, config: BirdConfig) {
    // reset acceleration
    this.acc.set(0, 0, 0);

    // find neighbors
    const neighbors = this.getNeighbors(boids, config);
    // apply rules
    this.applyRules(neighbors, config);

    // update velocity
    this.vel.add(this.acc.multiplyScalar(delta));
    // add noise to direction
    this.applyDireactionNoise(
      config.birdDirectionNoise,
      config.birdDirectionNoiseWeight
    );

    // limit speed
    // this.limitSpeed(config.birdMaxSpeed);
    // update position
    this.pos.set(
      this.pos.x + this.vel.x * delta,
      this.pos.y + this.vel.y * delta,
      this.pos.z + this.vel.z * delta
    );
    // check boundaries
    this.checkBoundaries(size);
  }

  applyRules(neighbors: IBird[], config: BirdConfig) {
    this.basicRules.forEach((rule) => rule.apply(this, neighbors, config));
  }

  limitSpeed(birdMaxSpeed: number) {
    if (this.vel.length() > birdMaxSpeed) {
      this.vel.normalize().multiplyScalar(birdMaxSpeed);
    }
  }

  applyDireactionNoise(
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
          for (const rule of this.basicRules) {
            rule.accumulate!(this, bird, config);
          }
        }
      }
    }
    return neighbors;
  }
}
