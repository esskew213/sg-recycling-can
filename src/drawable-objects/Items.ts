import FallingObject from './FallingObject';

export interface RecyclableDescription {
  itemName: string;
  description: string;
  velocity: number;
  imageName: string;
  points: number;
}

export interface NonRecyclableDescription {
  itemName: string;
  description: string;
  velocity: number;
  imageName: string;
  lifePenalty: number;
}

export interface DictionaryOfObjects<T> {
  [key: string]: T;
}

export class Recyclable extends FallingObject {
  #name: string;
  #description: string;
  #points: number;
  constructor(
    x: number,
    y: number,
    velocity: number,
    imageName: string,
    itemName: string,
    description: string,
    points: number
  ) {
    super(x, y, velocity, imageName);
    this.#name = itemName;
    this.#description = description;
    this.#points = points;
  }
  collisionEffect(updatePlayerStats: Function): void {
    updatePlayerStats('points', this.#points);
  }
}

export class NonRecyclable extends FallingObject {
  #name: string;
  #description: string;
  #lifePenalty: number;
  constructor(
    x: number,
    y: number,
    velocity: number,
    imageName: string,
    itemName: string,
    description: string,
    lifePenalty: number
  ) {
    super(x, y, velocity, imageName);
    this.#name = itemName;
    this.#description = description;
    this.#lifePenalty = lifePenalty;
  }
  collisionEffect(updatePlayerStats: Function): void {
    updatePlayerStats('lives', this.#lifePenalty);
  }
}

export const recyclableObjects: DictionaryOfObjects<RecyclableDescription> = {
  recyclable001: {
    itemName: 'glass bottle',
    imageName: 'glassBottle.png',
    description: 'Clean glass bottles can be recycled.',
    points: 1,
    velocity: 2,
  },
};
export const nonRecyclableObjects: DictionaryOfObjects<NonRecyclableDescription> =
  {
    nonrecyclable001: {
      itemName: 'crisps bag',
      imageName: 'crispsBag.png',
      description: 'Clean glass bottles can be recycled.',
      lifePenalty: -1,
      velocity: 2,
    },
  };
