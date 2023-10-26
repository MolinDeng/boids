export enum BirdStatus {
  Landed,
  Flying,
  // Alive,
  // Dead,
}

export interface PauseState {
  paused: boolean;
  setPaused: (p: boolean) => void;
  flipPaused: () => void;
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
}
