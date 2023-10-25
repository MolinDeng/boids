import React, { useMemo, useRef } from 'react';
import {
  ConeGeometry,
  InstancedMesh,
  MathUtils,
  MeshStandardMaterial,
  Object3D,
} from 'three';
import { Bird, IBird } from '@/models/Bird';
import { BIRD_MAX_SPEED, BIRD_NUM } from '@/lib/constants';
import { useFrame, useThree } from '@react-three/fiber';
import { useRenderPause } from '@/hooks/useBoidsConfig';
import { getAngleFromVector } from '@/lib/utils';

export default function BoidsRenderer({ w, h }: { w: number; h: number }) {
  // shared geometry
  // const coneGeometry = useMemo(() => new ConeGeometry(3, 10), []);
  // shared material
  // const mat = useMemo(() => new MeshStandardMaterial({ color: 'white' }), []);
  // shared dummy
  const dummy = useMemo(() => new Object3D(), []);
  // create boids logic objects
  const boids = useMemo(() => {
    const boids: IBird[] = [];
    for (let i = 0; i < BIRD_NUM; i++) {
      const bird = new Bird();
      bird.pos.set(MathUtils.randFloat(0, w), MathUtils.randFloat(0, h), 0);
      const randomAngle = MathUtils.randFloat(0, Math.PI * 2);
      bird.vel
        .set(Math.cos(randomAngle), Math.sin(randomAngle), 0)
        .normalize()
        .multiplyScalar(BIRD_MAX_SPEED); // pixels per second
      boids.push(bird);
    }
    return boids;
  }, []);

  const model = useRef<InstancedMesh>(null!);

  useFrame((state, delta) => {
    if (!useRenderPause.getState().paused) {
      // update boids
      boids.forEach((bird, i) => {
        bird.update(delta, boids, state.viewport);
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
