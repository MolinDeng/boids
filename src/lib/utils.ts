import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Vector3 } from 'three';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAngleFromVector(vector: Vector3): number {
  return Math.atan2(vector.y, vector.x);
}
