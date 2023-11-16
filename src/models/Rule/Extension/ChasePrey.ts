import { DEFAULT_SPEED } from '@/lib/constants';
import { IBird } from '@/models/Bird';
import { IObstacle } from '@/models/Obstacle';
import { IPredator, Predator } from '@/models/Predator';
import { IRule, Rule } from '@/models/Rule';
import { BirdConfig } from '@/types';
import { MathUtils } from 'three';

interface IChasePrey extends IRule {}

export default class ChasePrey extends Rule implements IChasePrey {
  constructor() {
    super();
  }

  apply(
    predator: IPredator,
    preys: IBird[],
    predators: IPredator[],
    obstacles: IObstacle[],
    config: BirdConfig
  ) {
    // find the most closest prey
    const closestPrey = this.getClosestPrey(predator, preys);
    if (closestPrey) {
      // just chase the prey
      this.value
        .subVectors(closestPrey.pos, predator.pos)
        .normalize()
        .multiplyScalar(config.birdMaxForce)
        .sub(predator.vel)
        .multiplyScalar(1.1); // TODO adjust through config
      predator.acc.add(this.value);
    } else {
      // wander around
      predator.vel.applyAxisAngle(
        Predator.axisZ,
        MathUtils.degToRad(MathUtils.randFloat(-12, 12))
      );
      const maxSpeed =
        config.birdMaxSpeed === 0 ? DEFAULT_SPEED : config.birdMaxSpeed;
      if (predator.vel.length() < maxSpeed) {
        this.value
          .copy(predator.vel)
          .multiplyScalar(1 - predator.vel.length() / maxSpeed);
        predator.acc.add(this.value);
      }
    }
    // reset vector
    this.reset();
  }

  // find the most closest prey
  getClosestPrey(predator: IPredator, preys: IBird[]): IBird | undefined {
    let closestPrey: IBird | undefined = undefined;
    let closestDistance = Infinity;
    let closestIndex = -1;
    preys.forEach((prey, i) => {
      const distance = predator.pos.distanceTo(prey.pos);
      if (distance < 200 && distance < closestDistance) {
        // TODO 200 adjust through config
        closestDistance = distance;
        closestPrey = prey;
        closestIndex = i;
      }
    });
    if (closestDistance < 10) preys.splice(closestIndex, 1); // remove the prey from the boids array
    return closestPrey;
  }

  // find the preys within the range
  // getPreys(boids: IBird[]): IBird[] {
  //   const preys = boids.filter((boid) => {
  //     const distance = this.pos.distanceTo(boid.pos);
  //     return distance < 60;
  //   });
  //   return preys;
  // }

  reset(): void {
    super.reset();
  }
}
