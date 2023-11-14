import { MathUtils, Vector3 } from 'three';
import { IBird } from '../Bird';
import { Size } from '@react-three/fiber';

export interface IPredator {
  pos: Vector3; // position
  vel: Vector3; // velocity
  acc: Vector3; // acceleration

  update(delta: number, boids: IBird[], size: Size): void;
}

export class Predator implements IPredator {
  pos: Vector3;
  vel: Vector3;
  acc: Vector3;

  static axisZ: Vector3 = new Vector3(0, 0, 1);

  constructor() {
    this.pos = new Vector3(0, 0, 0);
    this.vel = new Vector3(0, 0, 0);
    this.acc = new Vector3(0, 0, 0);
  }

  update(delta: number, boids: IBird[], size: Size): void {
    // reset acceleration
    this.acc.set(0, 0, 0);

    // find the most closest prey
    const closestPrey = this.getClosestPrey(boids);
    if (closestPrey) {
      // just chase the prey
      this.chase(closestPrey);
    } else {
      // wander around
      this.vel.applyAxisAngle(
        Predator.axisZ,
        MathUtils.degToRad(MathUtils.randFloat(-15, 15))
      );
      this.vel.normalize().multiplyScalar(400);
    }

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

  // chase the prey
  chase(prey: IBird): void {
    this.acc
      .copy(prey.pos)
      .sub(this.pos)
      .normalize()
      .multiplyScalar(400)
      .sub(this.vel)
      .multiplyScalar(1.1);
  }

  // find the most closest prey
  getClosestPrey(boids: IBird[]): IBird | undefined {
    let closestPrey: IBird | undefined = undefined;
    let closestDistance = Infinity;
    let closestIndex = -1;
    boids.forEach((boid, i) => {
      const distance = this.pos.distanceTo(boid.pos);
      if (distance < 200 && distance < closestDistance) {
        closestDistance = distance;
        closestPrey = boid;
        closestIndex = i;
      }
    });
    if (closestDistance < 10) boids.splice(closestIndex, 1); // remove the prey from the boids array
    return closestPrey;
  }

  // find the preys within the range
  // getPreys(boids: IBird[]): IBird[] {
  //   const preys = boids.filter((boid) => {
  //     const distance = this.pos.distanceTo(boid.pos);
  //     return distance < 60;
  //   });
  //   return preys;
  // }

  // boundless world
  checkBoundaries(size: Size) {
    if (this.pos.x > size.width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = size.width;
    if (this.pos.y > size.height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = size.height;
  }
}
