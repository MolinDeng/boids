// * Alignment: Bird tries to align its velocity with its neighbors

import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';

interface IAlignment extends Rule {}

export default class Alignment extends Rule implements IAlignment {
  apply(bird: IBird, neighbors: IBird[], config: BirdConfig) {
    if (neighbors.length === 0) {
      return;
    }

    neighbors.forEach((neighbor) => this.value.add(neighbor.vel));
    this.value
      .divideScalar(neighbors.length)
      .normalize()
      .multiplyScalar(config.birdMaxSpeed)
      .sub(bird.vel)
      .multiplyScalar(config.birdAlignmentWeight);

    bird.acc.add(this.value);
    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }

  // TODO: to be used
  accumulate(neighbor: IBird) {
    this.value.add(neighbor.vel);
  }
}
