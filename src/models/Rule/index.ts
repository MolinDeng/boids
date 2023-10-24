import { IBird } from '@/models/Bird';
import { Vector3 } from 'three';

export interface IRule {
  // bird is the bird to apply the rule to
  // neighbors are the birds that are within the radius of the bird
  apply: (bird: IBird, neighbors: IBird[]) => void;
  reset: () => void;
}

export abstract class Rule implements IRule {
  value: Vector3;

  constructor() {
    this.value = new Vector3(0, 0, 0);
  }

  reset() {
    this.value.set(0, 0, 0);
  }
  abstract apply(bird: IBird, neighbors: IBird[]): void;
}
