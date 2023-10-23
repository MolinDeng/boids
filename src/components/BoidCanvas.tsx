'use client';

import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import TestBox from './TestBox';

export default function BoidCanvas() {
  return (
    <Canvas className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-600">
      {/* <color attach="background" args={['#000']} /> */}
      <ambientLight intensity={1} />
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
      <TestBox position={[-25, 0, 0]} color="blue" />
    </Canvas>
  );
}
