'use client';

import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Boids from '@/components/BoidsRenderer';
import useWindowSize from '@/hooks/useWindowSize';

export default function BoidCanvas() {
  const { width, height } = useWindowSize();

  return (
    <Canvas className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-gray-900 from-gray-600">
      {/* <color attach="background" args={['#000']} /> */}
      <ambientLight intensity={6} />
      <OrthographicCamera
        makeDefault
        zoom={1}
        left={0}
        right={width!}
        bottom={0}
        top={height!}
        // near={1}
        // far={2000}
        position={[0, 0, 1000]}
      />
      <Boids w={width!} h={height!} />
    </Canvas>
  );
}
