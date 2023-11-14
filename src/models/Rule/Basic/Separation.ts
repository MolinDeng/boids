// * Separation: Bird tries to avoid collision with its neighbors

import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';
import { Vector3 } from 'three';

interface ISeparation extends Rule {
  diff: Vector3;
  cnt: number;
}

export default class Separation extends Rule implements ISeparation {
  diff: Vector3;
  cnt: number;

  constructor() {
    super();
    this.diff = new Vector3(0, 0, 0);
    this.cnt = 0;
  }

  apply(bird: IBird, neighbors: IBird[], config: BirdConfig) {
    if (neighbors.length === 0) return;

    // let d: number = 0;
    // neighbors.forEach((neighbor) => {
    //   this.diff.subVectors(bird.pos, neighbor.pos);
    //   d = this.diff.length();
    //   if (d <= config.birdSeparationRadius) {
    //     this.cnt++;
    //     this.diff.normalize().divideScalar(d); // weight by distance, closer birds are more repulsive
    //     this.value.add(this.diff);
    //   }
    // });
    if (this.cnt > 0) {
      this.value
        .divideScalar(this.cnt)
        .normalize()
        .multiplyScalar(config.birdMaxSpeed)
        .sub(bird.vel)
        .multiplyScalar(config.birdSeparationWeight);

      // bound by max force
      // if (config.birdMaxForce !== 0 && this.value.length() > config.birdMaxForce)
      //   this.value.normalize().multiplyScalar(config.birdMaxForce);

      bird.acc.add(this.value);
    }
    // reset vector
    this.reset();
  }

  accumulate(bird: IBird, neighbor: IBird, config: BirdConfig) {
    this.diff.subVectors(bird.pos, neighbor.pos);
    const d: number = this.diff.length();
    if (d <= config.birdSeparationRadius) {
      this.cnt++;
      this.diff.normalize().divideScalar(d); // weight by distance, closer birds are more repulsive
      this.value.add(this.diff);
    }
  }

  reset(): void {
    super.reset();
    this.cnt = 0;
  }
}
