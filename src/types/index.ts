import { Vector3 } from 'three';

// export enum BirdStatus {
//   Landed,
//   Flying,
//   // Alive,
//   // Dead,
// }

export interface PauseState {
  paused: boolean;
  nextFrame: boolean;
  memoRefresh: boolean; // trigger useMemo refresh
  setPaused: (p: boolean) => void;
  flipPaused: () => void;
  setNextFrame: (p: boolean) => void;
  flipMemoFresh: () => void;
}

export interface BirdConfig {
  birdNum: number;
  birdPerceivedRadius: number;
  birdMaxSpeed: number;
  birdMaxForce: number;
  birdSeparationWeight: number;
  birdAlignmentWeight: number;
  birdCohesionWeight: number;
  birdSeparationRadius: number;
  birdDirectionNoise: number;
  birdDirectionNoiseWeight: number;
  bounceOffEdge: boolean;
  bounceMargin: number;
  bounceTurnFactor: number; // TODO obtain be calculation

  birdRemain: number;

  // predator config
  predatorNum: number;
  // obstacle config
  perceiveObstacle: boolean;
}

export interface BirdConfigActions {
  setBirdNum: (n: number) => void;
  setBirdPerceivedRadius: (n: number) => void;
  setBirdMaxSpeed: (n: number) => void;
  setBirdMaxForce: (n: number) => void;
  setBirdSeparationWeight: (n: number) => void;
  setBirdAlignmentWeight: (n: number) => void;
  setBirdCohesionWeight: (n: number) => void;
  setBirdSeparationRadius: (n: number) => void;
  setBirdDirectionNoise: (n: number) => void;
  setBirdDirectionNoiseWeight: (n: number) => void;
  flipBounceOffEdge: () => void;
  setBounceMargin: (n: number) => void;
  setBounceTurnFactor: (n: number) => void;

  setBirdRemain: (n: number) => void;
  // predator config actions
  setPredatorNum: (n: number) => void;
  // obstacle config actions
  flipPerceiveObstacle: () => void;
}
