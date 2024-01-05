import { BOARD_SIZE_X, BOARD_SIZE_Y } from './constant';
import type { Coordinates } from '@/types/types';

const randomCoordinates = (x_max: number, y_max: number): Coordinates => {
  return { x: Math.floor(Math.random() * x_max), y: Math.floor(Math.random() * y_max) };
};

export const isDuplicateCoordinates = (checkCoordinates: Coordinates, segments: Coordinates[]) => {
  return segments.some((segment) => segment.x === checkCoordinates.x && segment.y === checkCoordinates.y);
};

export const createNewCoordinates = (existCoordinates: Coordinates[]) => {
  let newCoordinates;
  do {
    newCoordinates = randomCoordinates(BOARD_SIZE_X, BOARD_SIZE_Y);
  } while (isDuplicateCoordinates(newCoordinates, existCoordinates));
  return newCoordinates;
};
