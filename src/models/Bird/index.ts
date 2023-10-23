export interface IBird {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  acc: THREE.Vector3;

  energy: number;
  maxEnergy: number;

  maxSpeed: number;

  status: BirdStatus;
}

export class Bird implements IBird {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  acc: THREE.Vector3;

  energy: number;
  maxEnergy: number;

  maxSpeed: number;

  status: BirdStatus;

  constructor(pos: THREE.Vector3, vel: THREE.Vector3, acc: THREE.Vector3) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.maxSpeed = 0; // TODO
    this.energy = 0; // TODO
    this.maxEnergy = 0; // TODO
    this.status = BirdStatus.Flying; // TODO
  }
}
