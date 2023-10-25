import { useRenderPause } from '@/hooks/useBoidsConfig';
import { getAngleFromVector } from '@/lib/utils';
import { IBird } from '@/models/Bird';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

interface BirdRendererProps extends MeshProps {
  bird: IBird;
  boids: IBird[];
}

export default function BirdRenderer({
  bird,
  boids,
  ...prop
}: BirdRendererProps) {
  const meshRef = useRef<Mesh>(null!);
  const { size } = useThree();

  useFrame((state, delta) => {
    if (!useRenderPause.getState().paused) {
      bird.update(delta, boids, size);
      meshRef.current.position.copy(bird.pos);
      meshRef.current.rotation.z = getAngleFromVector(bird.vel) - Math.PI / 2;
    }
  });

  return (
    <>
      <mesh {...prop} ref={meshRef}>
        <coneGeometry args={[3, 10]} attach="geometry" />
        {/* <meshStandardMaterial color="red" /> */}
      </mesh>
    </>
  );
}
