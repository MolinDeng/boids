// * Cohesion: Bird tries to fly toward the centre of mass of its neighbors

import { IBird } from '@/models/Bird';
import { Rule } from '@/models/Rule';

export default class Alignment implements Rule {
  apply(bird: IBird, neighbors: IBird[]) {
    // TODO
  }
}
