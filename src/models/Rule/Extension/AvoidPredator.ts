import { IBird } from '@/models/Bird';
import { IPredator } from '@/models/Predator';
import { IRule, Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';
import { Vector3 } from 'three';

interface IAvoidPredator extends IRule {}

export default class AvoidPredator extends Rule implements IAvoidPredator {
  diff: Vector3;

  constructor() {
    super();
    this.diff = new Vector3(0, 0, 0);
  }

  apply(
    bird: IBird,
    neighbors: IBird[],
    config: BirdConfig,
    predators: IPredator[]
  ) {
    if (predators.length === 0) return;

    let d: number,
      cnt: number = 0;
    predators.forEach((predator) => {
      d = bird.pos.distanceTo(predator.pos);
      if (d <= config.birdPerceivedRadius) {
        cnt++;
        this.diff
          .subVectors(bird.pos, predator.pos)
          .normalize()
          .divideScalar(d);
        this.value.add(this.diff);
      }
    });

    if (cnt > 0) {
      this.value
        .normalize()
        .multiplyScalar(config.birdMaxForce)
        .sub(bird.vel)
        .multiplyScalar(1.5); // TODO adjust through config

      bird.acc.copy(this.value);
    }

    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }
}
