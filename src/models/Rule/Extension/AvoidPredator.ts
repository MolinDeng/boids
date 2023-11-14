import { IBird } from '@/models/Bird';
import { IPredator } from '@/models/Predator';
import { IRule, Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';

interface IAvoidPredator extends IRule {}

export default class AvoidPredator extends Rule implements IAvoidPredator {
  apply(
    bird: IBird,
    neighbors: IBird[],
    config: BirdConfig,
    predators: IPredator[]
  ) {
    if (predators.length === 0) return;

    // TODO multiple predators
    const predator = predators[0];
    const d = bird.pos.distanceTo(predator.pos);
    if (d <= config.birdPerceivedRadius) {
      this.value
        .subVectors(bird.pos, predator.pos)
        .normalize()
        .multiplyScalar(config.birdMaxSpeed)
        .sub(bird.vel)
        .multiplyScalar(2);

      bird.acc.copy(this.value);
    }

    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }
}
