// * Alignment: Bird tries to align its velocity with its neighbors

import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';

interface IAlignment extends Rule {}

export default class Alignment extends Rule implements IAlignment {
  apply(bird: IBird, neighbors: IBird[], config: BirdConfig) {
    if (neighbors.length === 0) return;

    // neighbors.forEach((neighbor) => this.value.add(neighbor.vel));
    this.value
      .divideScalar(neighbors.length)
      .normalize()
      .multiplyScalar(config.birdMaxForce)
      .sub(bird.vel)
      .multiplyScalar(config.birdAlignmentWeight);

    // bound by max force
    // if (config.birdMaxForce !== 0 && this.value.length() > config.birdMaxForce)
    // this.value.normalize().multiplyScalar(config.birdMaxForce);

    bird.acc.add(this.value);
    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }

  accumulate(bird: IBird, neighbor: IBird, config: BirdConfig) {
    this.value.add(neighbor.vel);
  }
}
