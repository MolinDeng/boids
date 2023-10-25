export enum BirdStatus {
  Landed,
  Flying,
  // Alive,
  // Dead,
}

export interface BoidConfig {
  birdNum: number;
  separation: number;
  alignment: number;
  cohesion: number;
  maxSpeed: number;
  maxForce: number;
  maxEnergy: number;
}
