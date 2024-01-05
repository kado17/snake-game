export type Coordinates = {
  x: number;
  y: number;
};

export const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

export const OppositeDirection = {
  UP: 'DOWN',
  DOWN: 'UP',
  RIGHT: 'LEFT',
  LEFT: 'RIGHT',
} as const;

export const Grid = {
  BLANK: 'BLANK',
  SNAKEHEAD: 'SNAKEHEAD',
  SNAKEBODY: 'SNAKEBODY',
  FOOD: 'FOOD',
} as const;
export type Grid = (typeof Grid)[keyof typeof Grid];

export const GameStatus = {
  PLAYING: 'PLAYING',
  SUSPEND: 'SUSPEND',
  CLEAR: 'CLEAR',
  OVER: 'OVER',
} as const;
export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];
