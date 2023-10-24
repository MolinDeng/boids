// * Cohesion: Bird tries to fly toward the centre of mass of its neighbors

import { BIRD_MAX_SPEED } from '@/lib/constants';
import { IBird } from '@/models/Bird';
import { IRule, Rule } from '@/models/Rule';

interface ICohesion extends IRule {}

export default class Alignment extends Rule implements ICohesion {
  apply(bird: IBird, neighbors: IBird[]) {
    if (neighbors.length === 0) {
      return;
    }

    neighbors.forEach((neighbor) => this.value.add(neighbor.pos));
    this.value
      .divideScalar(neighbors.length)
      .normalize()
      .multiplyScalar(BIRD_MAX_SPEED) // TODO adjust speed through UI
      .sub(bird.vel)
      .multiplyScalar(0.1); // TODO adjust weight through UI

    bird.acc.add(this.value);
    // reset vector
    this.reset();
  }
}
