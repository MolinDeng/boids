import { IBird } from '@/models/Bird';
import { IObstacle } from '@/models/Obstacle';
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
    predators: IPredator[],
    obstacles: IObstacle[],
    config: BirdConfig
  ) {
    if (predators.length === 0) return;

    let d: number,
      cnt: number = 0;
    predators.forEach((pred) => {
      d = bird.pos.distanceTo(pred.pos);
      if (d <= config.birdPerceivedRadius) {
        cnt++;
        this.diff.subVectors(bird.pos, pred.pos).normalize().divideScalar(d);
        this.value.add(this.diff);
      }
    });

    if (cnt > 0) {
      this.value
        .normalize()
        .multiplyScalar(config.birdMaxForce)
        .sub(bird.vel)
        .multiplyScalar(2.5); // TODO this weight should be distance dependent

      // bird.acc.copy(this.value);
      bird.acc.add(this.value);
    }

    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }
}
