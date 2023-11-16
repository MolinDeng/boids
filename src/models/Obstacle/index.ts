import { Vector3 } from 'three';

export interface IObstacle {
  pos: Vector3;
  radius: number;
}

export class Obstacle implements IObstacle {
  pos: Vector3;
  radius: number;

  constructor(initPos: Vector3, radius: number) {
    this.pos = initPos;
    this.radius = radius;
  }
}
