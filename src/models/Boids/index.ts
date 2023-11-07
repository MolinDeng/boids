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
      const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
      bird.vel
        .set(Math.cos(randomAngle), Math.sin(randomAngle), 0) // random direction
        .normalize() // normalize
        .multiplyScalar(maxSpeed); // pixels per second
      this.birds.push(bird);
    }
  }
}
