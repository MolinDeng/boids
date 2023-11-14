import { Bird, IBird } from '@/models/Bird';
import { MathUtils } from 'three';

export interface IBoids {
  birds: IBird[];
}

export class Boids implements IBoids {
  birds: IBird[];

  constructor(size: number, maxSpeed: number, w: number, h: number) {
    this.birds = [];
    for (let i = 0; i < size; i++) {
      const bird = new Bird();
      bird.pos.set(MathUtils.randFloat(0, w), MathUtils.randFloat(0, h), 0);
      bird.vel
        .set(MathUtils.randFloat(-1, 1), MathUtils.randFloat(-1, 1), 0)
        .normalize() // normalize
        .multiplyScalar(maxSpeed); // pixels per second
      this.birds.push(bird);
    }
  }
}
