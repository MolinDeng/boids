import { MeshProps, useFrame } from '@react-three/fiber';
import { FC, useRef, useState } from 'react';
import { Mesh } from 'three';

interface TestBoxProps extends MeshProps {}

const TestBox: FC<TestBoxProps> = ({ ...prop }) => {
  // This reference gives us direct access to the THREE.Mesh object.
  const meshRef = useRef<Mesh>(null!);

  // Hold state for hovered and clicked events.
  const [hovered, hover] = useState<boolean>(false);
  const [clicked, click] = useState<boolean>(false);

  // Subscribe this component to the render-loop and rotate the mesh every frame.
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh
      {...prop}
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[50, 50, 50]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default TestBox;
