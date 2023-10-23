import { useBoids } from '@/hooks/useBoids';
import { Bird } from '@/models/Bird';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

interface BirdRendererProps extends MeshProps {
  bird: Bird;
}

export default function BirdRenderer({ bird, ...prop }: BirdRendererProps) {
  const boids = useBoids({ numberOfBirds: 20 });
  const meshRef = useRef<Mesh>(null!);
  const { size } = useThree();

  useFrame((state, delta) => {
    bird.update(boids, size);
    meshRef.current.position.copy(bird.pos);
  });
  return (
    <>
      <mesh {...prop} ref={meshRef}>
        <sphereGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
