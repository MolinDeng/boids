// * Separation: Bird tries to avoid collision with its neighbors

import { BIRD_MAX_SPEED } from '@/lib/constants';
import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';

interface ISeparation extends Rule {}

export default class Separation extends Rule implements ISeparation {
  apply(bird: IBird, neighbors: IBird[]) {
    if (neighbors.length === 0) {
      return;
    }

    neighbors.forEach((neighbor) => {
      const diff = bird.pos.clone().sub(neighbor.pos);
      const d = diff.length();
      diff.normalize().divideScalar(d);
      this.value.add(diff);
    });
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
