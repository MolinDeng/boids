'use client';

import { OrthographicCamera } from '@react-three/drei';
import { Canvas, MeshProps } from '@react-three/fiber';
import useWindowSize from '@/hooks/useWindowSize';
import BoidsRenderer from '@/components/BoidsRenderer';
import { useDrag } from '@use-gesture/react';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useObstacleConfig } from '@/hooks/useBoidsConfig';

const Obstacles = [
  {
    x: 500,
    y: 500,
    radium: 50,
  },
  {
    x: 800,
    y: 500,
    radium: 50,
  },
];

function Obstacle({
  initX,
  initY,
  radium,
}: {
  initX: number;
  initY: number;
  radium: number;
}) {
  const ref = useRef<Mesh>(null!);
  const bind = useDrag(({ offset: [x, y] }) => {
    ref.current.position.set(initX + x, initY - y, 10);
  });

  return (
    <mesh {...(bind() as MeshProps)} ref={ref} position={[initX, initY, 10]}>
      <circleGeometry args={[radium]} />
      <meshStandardMaterial color="cornflowerblue" />
    </mesh>
  );
}

export default function BoidCanvas() {
  const { width, height } = useWindowSize();
  const obtActive = useObstacleConfig((state) => state.active);
  const obstacles = obtActive ? Obstacles : [];
  return (
    <Canvas className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-gray-900 from-gray-600">
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
      <BoidsRenderer w={width!} h={height!} />
      {obstacles.map((o, i) => (
        <Obstacle key={i} initX={o.x} initY={o.y} radium={o.radium} />
      ))}
    </Canvas>
  );
}
