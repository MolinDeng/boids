import { IBird } from '@/models/Bird';

export interface IRule {
  // bird is the bird to apply the rule to
  // neighbors are the birds that are within the radius of the bird
  apply: (bird: IBird, neighbors: IBird[]) => void;
}

export abstract class Rule implements IRule {
  abstract apply(bird: IBird, neighbors: IBird[]): void;
}
