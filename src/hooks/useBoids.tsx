'use client';
import { Bird } from '@/models/Bird';
import { useEffect, useState } from 'react';
import { MathUtils, Vector3 } from 'three';

export const useBoids = ({ numberOfBirds }: { numberOfBirds: number }) => {
  const [boids, setBoids] = useState<Bird[]>([]);

  useEffect(() => {
    if (numberOfBirds - boids.length > 0) {
      const newBoids: Bird[] = [];
      for (let i = 0; i < numberOfBirds - boids.length; i++) {
        const pos = new Vector3(
          MathUtils.randFloat(-500, 500),
          MathUtils.randFloat(-500, 500),
          MathUtils.randFloat(-500, 500)
        );
        const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
        const vel = new Vector3(Math.cos(randomAngle), Math.sin(randomAngle), 0)
          .normalize()
          .multiplyScalar(0.5);
        newBoids.push(new Bird(pos, vel));
      }

      setBoids((prev) => [...prev, ...newBoids]);
    } else if (numberOfBirds - boids.length < 0) {
      // TODO remove died boids
    }
  }, []);

  return boids;
};
