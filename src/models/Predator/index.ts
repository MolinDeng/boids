import { Vector3 } from 'three';
import { IBird } from '../Bird';
import { Size } from '@react-three/fiber';
import { BirdConfig } from '@/types';
import { IObstacle } from '@/models/Obstacle';
import { IRule } from '../Rule';
import AvoidObstacles from '../Rule/Extension/AvoidObstacles';
import ChasePrey from '../Rule/Extension/ChasePrey';

export interface IPredator {
  pos: Vector3; // position
  vel: Vector3; // velocity
  acc: Vector3; // acceleration

  update(
    delta: number,
    size: Size,
    boids: IBird[],
    obstacles: IObstacle[],
    config: BirdConfig
  ): void;
}

export class Predator implements IPredator {
  pos: Vector3;
  vel: Vector3;
  acc: Vector3;

  rules: IRule[];

  static axisZ: Vector3 = new Vector3(0, 0, 1);

  constructor() {
    this.pos = new Vector3(0, 0, 0);
    this.vel = new Vector3(0, 0, 0);
    this.acc = new Vector3(0, 0, 0);
    this.rules = [new ChasePrey(), new AvoidObstacles()];
  }

  update(
    delta: number,
    size: Size,
    boids: IBird[],
    obstacles: IObstacle[],
    config: BirdConfig
  ): void {
    // reset acceleration
    this.acc.set(0, 0, 0);

    // apply rules
    this.applyRules(boids, obstacles, config);

    // update velocity
    this.vel.add(this.acc.multiplyScalar(delta));

    // update position
    this.pos.set(
      this.pos.x + this.vel.x * delta,
      this.pos.y + this.vel.y * delta,
      this.pos.z + this.vel.z * delta
    );

    // wrap around the screen
    this.checkBoundaries(size);
  }

  applyRules(preys: IBird[], obstacles: IObstacle[], config: BirdConfig) {
    this.rules.forEach((rule) =>
      rule.apply(this, preys, null, obstacles, config)
    );
  }

  // boundless world
  checkBoundaries(size: Size) {
    if (this.pos.x > size.width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = size.width;
    if (this.pos.y > size.height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = size.height;
  }
}
