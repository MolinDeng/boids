import { Vector3 } from 'three';

export interface IObstacle {
  initPos: Vector3;
  pos: Vector3;
  radius: number;
}

export class Obstacle implements IObstacle {
  initPos: Vector3;
  pos: Vector3;
  radius: number;

  constructor(initPos: Vector3, radius: number) {
    this.initPos = initPos;
    this.pos = initPos.clone();
    this.radius = radius;
  }
}
