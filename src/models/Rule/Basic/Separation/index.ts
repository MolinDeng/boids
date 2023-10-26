// * Separation: Bird tries to avoid collision with its neighbors

import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';
import { Vector3 } from 'three';

interface ISeparation extends Rule {
  diff: Vector3;
}

export default class Separation extends Rule implements ISeparation {
  diff: Vector3;

  constructor() {
    super();
    this.diff = new Vector3(0, 0, 0);
  }

  apply(bird: IBird, neighbors: IBird[], config: BirdConfig) {
    if (neighbors.length === 0) {
      return;
    }

    let d: number = 0;
    let cnt: number = 0;
    neighbors.forEach((neighbor) => {
      this.diff.subVectors(bird.pos, neighbor.pos);
      d = this.diff.length();
      if (d <= config.birdSeparationRadius) {
        cnt++;
        this.diff.normalize().divideScalar(d); // weight by distance, closer birds are more repulsive
        this.value.add(this.diff);
      }
    });
    if (cnt > 0) {
      this.value
        .divideScalar(cnt)
        .normalize()
        .multiplyScalar(config.birdMaxSpeed)
        .sub(bird.vel)
        .multiplyScalar(config.birdSeparationWeight);

      bird.acc.add(this.value);
    }
    // reset vector
    this.reset();
  }
}
