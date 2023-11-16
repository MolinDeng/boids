import { IBird } from '@/models/Bird';
import { IObstacle } from '@/models/Obstacle';
import { IPredator } from '@/models/Predator';
import { IRule, Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';
import { Vector3 } from 'three';

interface IAvoidObstacles extends IRule {}

type BirdOrPredator = IBird | IPredator;

export default class AvoidObstacles extends Rule implements IAvoidObstacles {
  diff: Vector3;

  constructor() {
    super();
    this.diff = new Vector3(0, 0, 0);
  }

  apply(
    bird: BirdOrPredator,
    neighbors: IBird[],
    predators: IPredator[],
    obstacles: IObstacle[],
    config: BirdConfig
  ) {
    if (config.perceiveObstacle === false) return;

    let d: number,
      cnt: number = 0;
    obstacles.forEach((obs) => {
      d = bird.pos.distanceTo(obs.pos) - obs.radius;
      if (d > 0 && d <= config.birdPerceivedRadius) {
        cnt++;
        this.diff.subVectors(bird.pos, obs.pos).normalize().divideScalar(d);
        this.value.add(this.diff);
      }
    });

    if (cnt > 0) {
      this.value
        .normalize()
        .multiplyScalar(config.birdMaxForce)
        .sub(bird.vel)
        .multiplyScalar(config.birdSeparationWeight); // TODO this weight should be distance dependent

      bird.acc.add(this.value);
    }

    // reset vector
    this.reset();
  }

  reset(): void {
    super.reset();
  }
}
