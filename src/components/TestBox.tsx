import { SpotLight, useDepthBuffer } from '@react-three/drei';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import { FC, useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';

interface TestBoxProps extends MeshProps {
  color: string;
}

const Torch = ({ vec = new Vector3(), ...props }) => {
  const light = useRef<THREE.SpotLight>(null);
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current?.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      ),
      0.1
    );
    light.current?.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={10}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={3}
      {...props}
    />
  );
};

const TestBox: FC<TestBoxProps> = ({ color, ...prop }) => {
  const depthBuffer = useDepthBuffer({ frames: 1 });

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
    <>
      {/* <Torch depthBuffer={depthBuffer} color="blue" position={[3, 2, 2]} /> */}
      {/* <Torch depthBuffer={depthBuffer} color="#b00c3f" position={[-3, 2, 2]} /> */}
      <mesh
        {...prop}
        ref={meshRef}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[50, 50, 50]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

export default TestBox;
