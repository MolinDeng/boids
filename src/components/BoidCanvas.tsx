'use client';

import TestBox from '@/components/TestBox';
import { OrthographicCamera, useDepthBuffer } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function BoidCanvas() {
  return (
    <Canvas>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={1} />

      <TestBox position={[-25, 0, 0]} color="blue" />
      <TestBox position={[25, 0, 0]} color="red" />

      <OrthographicCamera
        makeDefault
        // zoom={1}
        // top={200}
        // bottom={-200}
        // left={200}
        // right={-200}
        // near={1}
        // far={2000}
        position={[0, 0, 1000]}
      />
    </Canvas>
  );
}
