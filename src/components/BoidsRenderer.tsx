import React, { useMemo, useRef } from 'react';
import {
  ConeGeometry,
  InstancedMesh,
  MathUtils,
  MeshStandardMaterial,
  Object3D,
} from 'three';
import { Bird, IBird } from '@/models/Bird';
import { useFrame } from '@react-three/fiber';
import { useRenderPause, useBirdConfig } from '@/hooks/useBoidsConfig';
import { getAngleFromVector } from '@/lib/utils';

export default function BoidsRenderer({ w, h }: { w: number; h: number }) {
  // shared geometry
  // const coneGeometry = useMemo(() => new ConeGeometry(3, 10), []);
  // shared material
  // const mat = useMemo(() => new MeshStandardMaterial({ color: 'white' }), []);
  // shared dummy
  const dummy = useMemo(() => new Object3D(), []);

  const { birdNum, birdMaxSpeed } = useBirdConfig();
  // create boids logic objects
  const boids = useMemo(() => {
    const boids: IBird[] = [];
    for (let i = 0; i < birdNum; i++) {
      const bird = new Bird();
      bird.pos.set(MathUtils.randFloat(0, w), MathUtils.randFloat(0, h), 0);
      const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
      bird.vel
        .set(Math.cos(randomAngle), Math.sin(randomAngle), 0) // random direction
        .normalize() // normalize
        .multiplyScalar(birdMaxSpeed); // pixels per second
      boids.push(bird);
    }
    return boids;
  }, [birdNum]); // dependency is only birdNum, whenever birdNum changes, this will be re-run

  const model = useRef<InstancedMesh>(null!);

  useFrame((state, delta) => {
    if (
      !useRenderPause.getState().paused ||
      useRenderPause.getState().nextFrame
    ) {
      useRenderPause.getState().setNextFrame(false);
      // update boids
      boids.forEach((bird, i) => {
        bird.update(delta, boids, state.viewport, useBirdConfig.getState());
        dummy.position.copy(bird.pos);
        dummy.rotation.z = getAngleFromVector(bird.vel) - Math.PI / 2;
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        model.current.setMatrixAt(i, dummy.matrix);
      });
      // update model
      model.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={model} args={[, , boids.length]}>
      <coneGeometry args={[3, 10]} attach="geometry" />
      <meshBasicMaterial color="white" attach="material" />
    </instancedMesh>
  );
}
