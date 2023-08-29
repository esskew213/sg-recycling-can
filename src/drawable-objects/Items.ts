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
  #points: number;
  constructor(
    x: number,
    y: number,
    velocityMultiplier: number,
    velocity: number,
    imageName: string,
    itemName: string,
    description: string,
    points: number
  ) {
    super(x, y, velocityMultiplier, velocity, imageName, itemName, description);
    this.#points = points;
  }
  collisionEffect(updatePlayerStats: Function): void {
    updatePlayerStats('points', this.#points);
  }
}

export class NonRecyclable extends FallingObject {
  #lifePenalty: number;
  constructor(
    x: number,
    y: number,
    velocityMultiplier: number,
    velocity: number,
    imageName: string,
    itemName: string,
    description: string,
    lifePenalty: number
  ) {
    super(x, y, velocityMultiplier, velocity, imageName, itemName, description);
    this.#lifePenalty = lifePenalty;
  }
  collisionEffect(updatePlayerStats: Function): void {
    updatePlayerStats('lives', this.#lifePenalty);
  }
}

export const recyclableObjects: DictionaryOfObjects<RecyclableDescription> = {
  recyclable001: {
    itemName: 'Glass bottle',
    imageName: 'glassBottle.png',
    description: 'Clean glass bottles can be recycled.',
    points: 1,
    velocity: 2,
  },
  recyclable002: {
    itemName: 'Red packet',
    imageName: 'redPacket.png',
    description: 'Red packets can be recycled!',
    points: 1,
    velocity: 2,
  },
  recyclable003: {
    itemName: 'Plastic bottle',
    imageName: 'plasticBottle.png',
    description: 'Plastic bottles can be recycled.',
    points: 1,
    velocity: 2,
  },
};

export const nonRecyclableObjects: DictionaryOfObjects<NonRecyclableDescription> =
  {
    nonrecyclable001: {
      itemName: 'Crisps bag',
      imageName: 'crispsBag.png',
      description: "Foil-lined bags can't be recycled!",
      lifePenalty: -1,
      velocity: 2,
    },
    nonrecyclable002: {
      itemName: 'Shoes',
      imageName: 'shoes.png',
      description: "Your kicks can't be recycled!",
      lifePenalty: -1,
      velocity: 2,
    },
    nonrecyclable003: {
      itemName: 'Pyrex',
      imageName: 'pyrex.png',
      description: "Pyrex containers can't be recycled. :0",
      lifePenalty: -1,
      velocity: 2,
    },
    nonrecyclable004: {
      itemName: 'Tissue',
      imageName: 'tissue.png',
      description: "Tissues can't be recycled! Eww!",
      lifePenalty: -1,
      velocity: 2,
    },
  };
