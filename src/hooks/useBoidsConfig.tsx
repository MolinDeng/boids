import { BirdConfig, BirdConfigActions, PauseState } from '@/types';
import { create } from 'zustand';

export const useRenderConfig = create<PauseState>((set) => ({
  paused: false,
  nextFrame: false,
  memoRefresh: false,
  setPaused: (p) => set(() => ({ paused: p })),
  flipPaused: () => set((state) => ({ paused: !state.paused })),
  setNextFrame: (p) => set(() => ({ nextFrame: p })),
  flipMemoFresh: () => set((state) => ({ memoRefresh: !state.memoRefresh })),
}));

export const useBirdConfig = create<BirdConfig & BirdConfigActions>((set) => ({
  birdNum: 500,
  birdPerceivedRadius: 50,
  birdMaxSpeed: 0,
  birdMaxForce: 400,
  birdSeparationWeight: 1,
  birdAlignmentWeight: 0.9,
  birdCohesionWeight: 0.9,
  birdSeparationRadius: 40,
  birdDirectionNoise: 10,
  birdDirectionNoiseWeight: 0.1,
  bounceOffEdge: false,
  bounceMargin: 200,
  bounceTurnFactor: 2,

  birdRemain: 0,
  // predator config
  predatorNum: 1,

  setBirdNum: (n: number) => set(() => ({ birdNum: n })),
  setBirdPerceivedRadius: (n: number) =>
    set(() => ({ birdPerceivedRadius: n })),
  setBirdMaxSpeed: (n: number) => set(() => ({ birdMaxSpeed: n })),
  setBirdMaxForce: (n: number) => set(() => ({ birdMaxForce: n })),
  setBirdSeparationWeight: (n: number) =>
    set(() => ({ birdSeparationWeight: n })),
  setBirdAlignmentWeight: (n: number) =>
    set(() => ({ birdAlignmentWeight: n })),
  setBirdCohesionWeight: (n: number) => set(() => ({ birdCohesionWeight: n })),
  setBirdSeparationRadius: (n: number) =>
    set(() => ({ birdSeparationRadius: n })),
  setBirdDirectionNoise: (n: number) => set(() => ({ birdDirectionNoise: n })),
  setBirdDirectionNoiseWeight: (n: number) =>
    set(() => ({ birdDirectionNoiseWeight: n })),
  flipBounceOffEdge: () =>
    set((state) => ({ bounceOffEdge: !state.bounceOffEdge })),
  setBounceMargin: (n: number) => set(() => ({ bounceMargin: n })),
  setBounceTurnFactor: (n: number) => set(() => ({ bounceTurnFactor: n })),

  setBirdRemain: (n: number) => set(() => ({ birdRemain: n })),

  // predator config actions
  setPredatorNum: (n: number) => set(() => ({ predatorNum: n })),
}));
