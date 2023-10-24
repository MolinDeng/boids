// * Alignment: Bird tries to align its velocity with its neighbors

import { BIRD_MAX_SPEED } from '@/lib/constants';
import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';

interface IAlignment extends Rule {}

export default class Alignment extends Rule implements IAlignment {
  apply(bird: IBird, neighbors: IBird[]) {
    if (neighbors.length === 0) {
      return;
    }

    neighbors.forEach((neighbor) => this.value.add(neighbor.vel));
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
