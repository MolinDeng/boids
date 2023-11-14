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
import { useRenderConfig, useBirdConfig } from '@/hooks/useBoidsConfig';
import { getAngleFromVector } from '@/lib/utils';
import { IPredator, Predator } from '@/models/Predator';

export default function BoidsRenderer({ w, h }: { w: number; h: number }) {
  // shared geometry
  // const coneGeometry = useMemo(() => new ConeGeometry(3, 10), []);
  // shared material
  // const mat = useMemo(() => new MeshStandardMaterial({ color: 'white' }), []);
  // shared dummy
  const dummy = useMemo(() => new Object3D(), []);
  const dummyPredator = useMemo(() => new Object3D(), []);

  const { birdNum, birdMaxSpeed } = useBirdConfig();
  const { memoRefresh } = useRenderConfig();
  // create boids logic objects
  const boids = useMemo(() => {
    // TODO use Boids class, maybe not necessary
    const boids: IBird[] = [];
    for (let i = 0; i < birdNum; i++) {
      const bird = new Bird();
      bird.pos.set(MathUtils.randFloat(0, w), MathUtils.randFloat(0, h), 0);
      bird.vel
        .set(MathUtils.randFloat(-1, 1), MathUtils.randFloat(-1, 1), 0)
        .normalize() // normalize
        .multiplyScalar(birdMaxSpeed); // pixels per second
      boids.push(bird);
    }
    return boids;
  }, [birdNum, memoRefresh]); // dependency is birdNum and memoRefresh

  // create predators logic objects
  const predators = useMemo(() => {
    const predators: IPredator[] = [];
    for (let i = 0; i < 1; i++) {
      const predator = new Predator();
      predator.pos.set(MathUtils.randFloat(0, w), MathUtils.randFloat(0, h), 0);
      predator.vel
        .set(MathUtils.randFloat(-1, 1), MathUtils.randFloat(-1, 1), 0)
        .normalize() // normalize
        .multiplyScalar(birdMaxSpeed); // pixels per second
      predators.push(predator);
    }
    return predators;
  }, [memoRefresh]);

  const model = useRef<InstancedMesh>(null!);
  const predatorModel = useRef<InstancedMesh>(null!);

  useFrame((state, delta) => {
    if (
      !useRenderConfig.getState().paused ||
      useRenderConfig.getState().nextFrame
    ) {
      useRenderConfig.getState().setNextFrame(false);
      // update boids
      // TODO use Boids class, maybe not necessary
      boids.forEach((bird, i) => {
        bird.update(
          delta,
          state.viewport,
          boids,
          predators,
          useBirdConfig.getState()
        );
        dummy.position.copy(bird.pos);
        dummy.rotation.z = getAngleFromVector(bird.vel) - Math.PI / 2;
        dummy.updateMatrix();
        model.current.setMatrixAt(i, dummy.matrix);
      });
      // update model
      model.current.instanceMatrix.needsUpdate = true;

      // update predators
      predators.forEach((predator, i) => {
        predator.update(delta, boids, state.viewport);
        dummyPredator.position.copy(predator.pos);
        dummyPredator.rotation.z =
          getAngleFromVector(predator.vel) - Math.PI / 2;
        dummyPredator.updateMatrix();
        predatorModel.current.setMatrixAt(i, dummyPredator.matrix);
      });
      // update model
      predatorModel.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={model} args={[, , boids.length]}>
        <coneGeometry args={[3, 10]} attach="geometry" />
        <meshBasicMaterial color="white" attach="material" />
      </instancedMesh>

      <instancedMesh ref={predatorModel} args={[, , predators.length]}>
        <coneGeometry args={[5, 14]} attach="geometry" />
        <meshBasicMaterial color="red" attach="material" />
      </instancedMesh>
    </>
  );
}
