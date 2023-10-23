import React from 'react';
import BirdRenderer from './BirdRenderer';
import { useBoids } from '@/hooks/useBoids';

export default function Boids() {
  // create boids
  const boids = useBoids({ numberOfBirds: 20 });

  return (
    <>
      {boids.map((bird, i) => (
        <BirdRenderer key={i} bird={bird} />
      ))}
    </>
  );
}
