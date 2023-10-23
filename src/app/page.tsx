'use client';

import TestBox from '@/components/TestBox';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <main>
      <Canvas>
        <color attach="background" args={['#fff']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <TestBox position={[100, 0, 0]} />
        <TestBox position={[-100, 0, 0]} />

        <OrthographicCamera
          makeDefault
          zoom={1}
          top={200}
          bottom={-200}
          left={200}
          right={-200}
          near={1}
          far={2000}
          position={[0, 0, 1000]}
        />
      </Canvas>
    </main>
  );
}
