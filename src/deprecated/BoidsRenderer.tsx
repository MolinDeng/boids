import React, { useMemo } from 'react';
import BirdRenderer from './BirdRenderer';
import { MathUtils, MeshStandardMaterial, Vector3 } from 'three';
import { Bird, IBird } from '@/models/Bird';
import { BIRD_MAX_SPEED, BIRD_NUM } from '@/lib/constants';

export default function BoidsRenderer({ w, h }: { w: number; h: number }) {
  // create boids
  const boids = useMemo(() => {
    const boids: IBird[] = [];
    for (let i = 0; i < BIRD_NUM; i++) {
      const bird = new Bird();
      bird.pos.set(MathUtils.randFloat(0, w), MathUtils.randFloat(0, h), 0);
      const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
      bird.vel
        .set(Math.cos(randomAngle), Math.sin(randomAngle), 0)
        .normalize()
        .multiplyScalar(BIRD_MAX_SPEED); // pixels per second
      boids.push(bird);
    }
    return boids;
  }, []);

  // const meshes = useRef<Mesh[]>(new Array(100).fill(null!));

  const mat = useMemo(() => new MeshStandardMaterial({ color: 'white' }), []);
  return (
    <>
      {boids.map((bird, i) => (
        <BirdRenderer key={i} bird={bird} boids={boids} material={mat} />
      ))}
    </>
  );
}
