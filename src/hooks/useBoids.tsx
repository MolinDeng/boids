'use client';
import { BIRD_MAX_SPEED } from '@/lib/constants';
import { Bird, IBird } from '@/models/Bird';
import { useEffect, useState } from 'react';
import { MathUtils, Vector3 } from 'three';

export const useBoids = () => {
  const [boids, setBoids] = useState<IBird[]>([]);
  const numberOfBirds = 10;
  useEffect(() => {
    if (numberOfBirds - boids.length > 0) {
      const newBoids: IBird[] = [];
      for (let i = 0; i < numberOfBirds - boids.length; i++) {
        const pos = new Vector3(
          MathUtils.randFloat(-1, 1),
          MathUtils.randFloat(-1, 1),
          MathUtils.randFloat(-1, 1)
        );
        const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
        const vel = new Vector3(Math.cos(randomAngle), Math.sin(randomAngle), 0)
          .normalize()
          .multiplyScalar(BIRD_MAX_SPEED / 2); // pixels per second
        newBoids.push(new Bird(pos, vel));
      }

      setBoids((prev) => [...prev, ...newBoids]);
    } else if (numberOfBirds - boids.length < 0) {
      // TODO remove died boids
    }
  }, []);

  return boids;
};
