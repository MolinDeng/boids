import React, { useMemo } from 'react';
import BirdRenderer from './BirdRenderer';
import { MathUtils, MeshStandardMaterial, Vector3 } from 'three';
import { Bird, IBird } from '@/models/Bird';
import { BIRD_MAX_SPEED } from '@/lib/constants';

export default function Boids({ w, h }: { w: number; h: number }) {
  // create boids
  const boids = useMemo(() => {
    const boids: IBird[] = [];
    for (let i = 0; i < 50; i++) {
      const pos = new Vector3(
        MathUtils.randFloat(0, w),
        MathUtils.randFloat(0, h),
        0
      );
      const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
      const vel = new Vector3(Math.cos(randomAngle), Math.sin(randomAngle), 0)
        .normalize()
        .multiplyScalar(BIRD_MAX_SPEED / 2); // pixels per second
      boids.push(new Bird(pos, vel));
    }
    return boids;
  }, []);

  const mat = useMemo(() => new MeshStandardMaterial({ color: 'red' }), []);
  return (
    <>
      {boids.map((bird, i) => (
        <BirdRenderer key={i} bird={bird} boids={boids} material={mat} />
      ))}
    </>
  );
}