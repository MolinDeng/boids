// * Cohesion: Bird tries to fly toward the centre of mass of its neighbors

import { IBird } from '@/models/Bird';
import { IRule, Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';

interface ICohesion extends IRule {}

export default class Alignment extends Rule implements ICohesion {
  apply(bird: IBird, neighbors: IBird[], config: BirdConfig) {
    if (neighbors.length === 0) {
      return;
    }

    neighbors.forEach((neighbor) => this.value.add(neighbor.pos));
    this.value
      .divideScalar(neighbors.length)
      .sub(bird.pos)
      .normalize()
      .multiplyScalar(config.birdMaxSpeed)
      .sub(bird.vel)
      .multiplyScalar(config.birdCohesionWeight);

    bird.acc.add(this.value);
    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }

  // TODO: to be used
  accumulate(neighbor: IBird) {
    this.value.add(neighbor.pos);
  }
}
