// * Separation: Bird tries to avoid collision with its neighbors

import { BIRD_MAX_SPEED, BIRD_SEPARATION_DISTANCE } from '@/lib/constants';
import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';
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

  apply(bird: IBird, neighbors: IBird[]) {
    if (neighbors.length === 0) {
      return;
    }
    let d: number = 0;
    neighbors.forEach((neighbor) => {
      this.diff.subVectors(bird.pos, neighbor.pos);
      d = this.diff.length();
      if (d <= BIRD_SEPARATION_DISTANCE) {
        this.diff.normalize().divideScalar(d); // weight by distance, closer birds are more repulsive
        this.value.add(this.diff);
      }
    });
    this.value
      .divideScalar(neighbors.length)
      .normalize()
      .multiplyScalar(BIRD_MAX_SPEED) // TODO adjust speed through UI
      .sub(bird.vel)
      .multiplyScalar(1); // TODO adjust weight through UI

    bird.acc.add(this.value);
    // reset vector
    this.reset();
  }
}
