import { BIRD_MAX_SPEED, BIRD_PERCEIVED_FLOCK_RADIUS } from '@/lib/constants';
import { IRule } from '@/models/Rule';
import Alignment from '@/models/Rule/Basic/Alignment';
import Cohesion from '@/models/Rule/Basic/Cohesion';
import Separation from '@/models/Rule/Basic/Separation';
import { BirdStatus } from '@/types';
import { Size } from '@react-three/fiber';
import { Vector3 } from 'three';

export interface IBird {
  pos: THREE.Vector3; // position
  vel: THREE.Vector3; // velocity
  acc: THREE.Vector3; // acceleration

  energy: number;
  maxEnergy: number;

  status: BirdStatus;

  update(delta: number, boids: IBird[], size: Size): void;
}

export class Bird implements IBird {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  acc: THREE.Vector3;

  energy: number;
  maxEnergy: number;

  status: BirdStatus;

  basicRules: IRule[];

  constructor(pos: THREE.Vector3, vel: THREE.Vector3) {
    this.pos = pos;
    this.vel = vel;
    this.acc = new Vector3(0, 0, 0);

    this.energy = 0; // TODO
    this.maxEnergy = 0; // TODO
    this.status = BirdStatus.Flying; // TODO

    // this.basicRules = [new Alignment(), new Cohesion(), new Separation()];
    this.basicRules = [];
  }

  update(delta: number, boids: IBird[], size: Size) {
    // find neighbors
    const neighbors = this.getNeighbors(boids);
    // apply rules
    this.applyRules(neighbors);
    // update velocity
    this.vel.add(this.acc.multiplyScalar(delta));
    // limit speed
    this.limitSpeed(BIRD_MAX_SPEED);
    // reset acceleration
    this.acc.set(0, 0, 0);
    // update position
    this.pos.set(
      this.pos.x + this.vel.x * delta,
      this.pos.y + this.vel.y * delta,
      this.pos.z + this.vel.z * delta
    );
    // check boundaries
    this.checkBoundaries(size);
  }

  applyRules(neighbors: IBird[]) {
    this.basicRules.forEach((rule) => rule.apply(this, neighbors));
  }

  limitSpeed(maxSpeed: number) {
    if (this.vel.length() > maxSpeed) {
      this.vel.normalize().multiplyScalar(maxSpeed);
    }
  }
  /*
  ==================== Utils ====================
  */
  // boundless world
  checkBoundaries(size: Size) {
    if (this.pos.x > size.width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = size.width;
    if (this.pos.y > size.height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = size.height;
  }
  getNeighbors(boids: IBird[]): IBird[] {
    const neighbors: IBird[] = [];
    for (const bird of boids) {
      if (bird !== this) {
        const distance = this.pos.distanceTo(bird.pos);

        if (distance < BIRD_PERCEIVED_FLOCK_RADIUS) {
          neighbors.push(bird);
        }
      }
    }
    return neighbors;
  }
}
