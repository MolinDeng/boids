import React, { useMemo } from 'react';
import BirdRenderer from './BirdRenderer';
import { useBoids } from '@/hooks/useBoids';
import { MeshStandardMaterial } from 'three';

export default function Boids() {
  // create boids
  const boids = useBoids(); // TODO maybe use zustand
  const mat = useMemo(() => new MeshStandardMaterial({ color: 'red' }), []);
  return (
    <>
      {boids.map((bird, i) => (
        <BirdRenderer key={i} bird={bird} material={mat} />
      ))}
    </>
  );
}
