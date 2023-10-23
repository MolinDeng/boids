import { IRule } from '@/models/Rule';
import Alignment from '@/models/Rule/Basic/Alignment';
import Cohesion from '@/models/Rule/Basic/Cohesion';
import Separation from '@/models/Rule/Basic/Separation';
import { BirdStatus } from '@/types';
import { Size } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';

export interface IBird {
  pos: THREE.Vector3; // position
  vel: THREE.Vector3; // velocity
  acc: THREE.Vector3; // acceleration

  energy: number;
  maxEnergy: number;

  maxSpeed: number;

  status: BirdStatus;
}

export class Bird implements IBird {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  acc: THREE.Vector3;

  energy: number;
  maxEnergy: number;

  maxSpeed: number;

  status: BirdStatus;

  basicRules: IRule[];

  static PERCEIVED_FLOCK_RADIUS = 50; // TODO move to config

  constructor(pos: THREE.Vector3, vel: THREE.Vector3) {
    this.pos = pos;
    this.vel = vel;
    this.acc = new Vector3(0, 0, 0);

    this.maxSpeed = 0; // TODO
    this.energy = 0; // TODO
    this.maxEnergy = 0; // TODO
    this.status = BirdStatus.Flying; // TODO

    this.basicRules = [new Alignment(), new Cohesion(), new Separation()];
  }

  applyRules(neighbors: IBird[]) {
    this.basicRules.forEach((rule) => rule.apply(this, neighbors));
  }

  update(boids: IBird[], size: Size) {
    // find neighbors
    const neighbors = this.getNeighbors(boids);
    // apply rules
    this.applyRules(neighbors);
    // update velocity
    this.vel.add(this.acc);
    // reset acceleration
    this.acc.multiplyScalar(0);
    // update position
    this.pos.add(this.vel);
    // check boundaries
    this.checkBoundaries(size);
  }
  /*
  ==================== Utils ====================
  */
  checkBoundaries(size: Size) {
    if (this.pos.x > size.width / 2) {
      this.pos.x = -size.width / 2;
    } else if (this.pos.x < -size.width / 2) {
      this.pos.x = size.width / 2;
    }
    if (this.pos.y > size.height / 2) {
      this.pos.y = -size.height / 2;
    } else if (this.pos.y < -size.height / 2) {
      this.pos.y = size.height / 2;
    }
  }

  getNeighbors(boids: IBird[]): IBird[] {
    const neighbors: IBird[] = [];
    for (const bird of boids) {
      if (bird !== this) {
        const distance = this.pos.distanceTo(bird.pos);
        if (distance < Bird.PERCEIVED_FLOCK_RADIUS) {
          neighbors.push(bird);
        }
      }
    }
    return neighbors;
  }
}
