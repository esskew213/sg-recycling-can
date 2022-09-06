import ObjectOnScreen from './drawable-objects/ObjectOnScreen';
import FallingObject from './drawable-objects/FallingObject';
import Paddle from './drawable-objects/Paddle';
import Background from './drawable-objects/Background';
import Scorekeeper from './drawable-objects/Scorekeeper';
import {
  DictionaryOfObjects,
  Recyclable,
  NonRecyclable,
  recyclableObjects,
  nonRecyclableObjects,
} from './drawable-objects/Items';
import { ExtraLife } from './drawable-objects/FallingObject';
import Lifekeeper from './drawable-objects/Lifekeeper';

class Engine {
  static MAX_FALLING_OBJECTS: number = 8;
  static BONUS_LIFE_PROBABILITY: number = 0.01;
  static OBJECT_PROBABILITY: number = 0.04;
  static RECYCLABLE_PROBABILITY: number = 0.5;

  fallingObjects: FallingObject[] = [];
  paddle?: Paddle;
  scorekeeper?: Scorekeeper;
  lifekeeper?: Lifekeeper;
  #backgroundImg?: Background;
  ctx: CanvasRenderingContext2D;
  itemsToDraw: ObjectOnScreen[] = [];

  constructor(element: Element) {
    const canvas = document.createElement('canvas');
    canvas.width = GameService.WIDTH;
    canvas.height = GameService.HEIGHT;
    element.appendChild(canvas);
    this.ctx = canvas.getContext('2d')!;
  }

  refreshScreen(): void {
    this.ctx.clearRect(0, 0, GameService.WIDTH, GameService.HEIGHT);
    this.itemsToDraw.forEach((item) => item.draw(this.ctx));
    FallingObject.onScreen.forEach((item) => {
      const boundUpdateStats = this.updateStats.bind(this);
      item.update(this.paddle!.x, boundUpdateStats);
    });
    this.generateFallingObject();
    this.deleteOffscreenObjects();
    console.log(this.scorekeeper!.score);
  }

  startGame(): void {
    this.#backgroundImg = new Background();
    this.paddle = new Paddle();
    this.scorekeeper = new Scorekeeper();
    this.lifekeeper = new Lifekeeper();
    let interval = setInterval(() => this.refreshScreen(), 16.7);
  }

  generateFallingObject(): void {
    function pickRandomObject<T>(dictionary: DictionaryOfObjects<T>): T {
      const randomNumber: number = Math.floor(
        Math.random() * Object.keys(dictionary).length
      );
      console.log(randomNumber);
      return Object.values(dictionary)[randomNumber];
    }

    if (FallingObject.onScreen.length < Engine.MAX_FALLING_OBJECTS) {
      if (Math.random() < Engine.BONUS_LIFE_PROBABILITY) {
        const newFallingObject: FallingObject = new ExtraLife(
          Math.random() * GameService.WIDTH,
          0,
          ExtraLife.VELOCITY,
          ExtraLife.IMAGE_NAME
        );
        this.itemsToDraw.push(newFallingObject);
        FallingObject.onScreen.push(newFallingObject);
      } else if (
        Math.random() <
        Engine.BONUS_LIFE_PROBABILITY + Engine.OBJECT_PROBABILITY
      ) {
        let newFallingObject: FallingObject;
        if (Math.random() < Engine.RECYCLABLE_PROBABILITY) {
          const { itemName, imageName, description, points, velocity } =
            pickRandomObject(recyclableObjects);
          newFallingObject = new Recyclable(
            Math.random() * GameService.WIDTH,
            0,
            velocity,
            imageName,
            itemName,
            description,
            points
          );
        } else {
          const { itemName, imageName, description, lifePenalty, velocity } =
            pickRandomObject(nonRecyclableObjects);
          newFallingObject = new NonRecyclable(
            Math.random() * GameService.WIDTH,
            0,
            velocity,
            imageName,
            itemName,
            description,
            lifePenalty
          );
        }
        this.itemsToDraw.push(newFallingObject);
        FallingObject.onScreen.push(newFallingObject);
      }
    }
  }

  deleteOffscreenObjects(): void {
    FallingObject.onScreen = FallingObject.onScreen.filter(
      (item) => item.isOnScreen
    );
    this.itemsToDraw = [
      this.#backgroundImg!,
      this.paddle!,
      this.scorekeeper!,
      this.lifekeeper!,
      ...FallingObject.onScreen,
    ];
  }

  updateStats(typeOfStat: 'lives' | 'points', stat: number): void {
    if (typeOfStat === 'points') {
      this.scorekeeper!.addPoints(stat);
    } else {
      this.lifekeeper!.addLives(stat);
    }
  }

  receiveArrowKey(direction: 'left' | 'right'): void {
    if (this.paddle !== undefined) {
      if (direction === 'left') {
        this.paddle.move('left');
      } else {
        this.paddle.move('right');
      }
    }
  }
}

export default class GameService {
  static WIDTH: number = 300;
  static HEIGHT: number = 600;
  static BACKGROUND_COLOUR: string = 'cornflowerblue';
  engine: Engine;
  gameState: 'notStarted' | 'started' | 'paused' | 'gameOver' = 'notStarted';

  constructor() {
    const gameContainer = document.querySelector('.game-container')!;
    this.engine = new Engine(gameContainer);
    window.addEventListener('keydown', (e) => this.listenToKeypress(e));
  }

  listenToKeypress(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.gameState === 'notStarted') {
      this.gameState = 'started';
      this.engine.startGame();
    } else if (e.key === 'ArrowRight' && this.gameState === 'started') {
      this.engine.receiveArrowKey('right');
    } else if (e.key === 'ArrowLeft' && this.gameState === 'started') {
      this.engine.receiveArrowKey('left');
    }
  }
}

const gameService = new GameService();
