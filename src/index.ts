import ObjectOnScreen from './drawable-objects/ObjectOnScreen';
import FallingObject from './drawable-objects/FallingObject';
import Background from './drawable-objects/Background';
import Paddle from './drawable-objects/Paddle';
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
import Menu from './Menu';
class Engine {
  static BONUS_LIFE_PROBABILITY_CUTOFF: number = 0.04;
  static RECYCLABLE_PROBABILITY_CUTOFF: number = 0.52;
  static NONRECYCLABLE_PROBABILITY_CUTOFF: number = 1;
  static SCORE_TO_MULTIPLIER_MAP: { [key: string]: number } = {
    '2': 1.5,
    '3': 2,
    '5': 3,
  };

  fallingObjects: FallingObject[] = [];
  paddle?: Paddle;
  scorekeeper?: Scorekeeper;
  lifekeeper?: Lifekeeper;
  #backgroundImg?: Background;
  ctx: CanvasRenderingContext2D;
  itemsToDraw: ObjectOnScreen[] = [];
  interval?: number;
  timeItemLastGenerated?: number;
  avgTimeBetweenGenerations: number = 3;
  maxObjectsOnScreen: number = 5;
  velocityMultiplier: number = 1;

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
      item.update(
        this.paddle!.x,
        this.paddle!.width,
        this.paddle!.height,
        boundUpdateStats
      );
      console.log(item.velocity);
    });
    this.generateFallingObject();
    this.deleteOffscreenObjects();
  }

  startGame(): void {
    this.#backgroundImg = new Background();
    this.paddle = new Paddle();
    this.scorekeeper = new Scorekeeper();
    this.lifekeeper = new Lifekeeper();
    this.interval = setInterval(() => this.refreshScreen(), 1000 / 60);
  }

  selectRandomObject(): FallingObject {
    function pickRandomObjectFromList<T>(
      dictionary: DictionaryOfObjects<T>
    ): T {
      const randomNumber: number = Math.floor(
        Math.random() * Object.keys(dictionary).length
      );
      return Object.values(dictionary)[randomNumber];
    }

    const randomNumber = Math.random();
    if (randomNumber < Engine.BONUS_LIFE_PROBABILITY_CUTOFF) {
      return new ExtraLife(
        Math.random() * GameService.WIDTH,
        0,
        this.velocityMultiplier
      );
    } else if (randomNumber < Engine.RECYCLABLE_PROBABILITY_CUTOFF) {
      const { itemName, imageName, description, points, velocity } =
        pickRandomObjectFromList(recyclableObjects);
      return new Recyclable(
        Math.random() * GameService.WIDTH,
        0,
        this.velocityMultiplier,
        velocity,
        imageName,
        itemName,
        description,
        points
      );
    } else {
      const { itemName, imageName, description, lifePenalty, velocity } =
        pickRandomObjectFromList(nonRecyclableObjects);
      return new NonRecyclable(
        Math.random() * GameService.WIDTH,
        0,
        this.velocityMultiplier,
        velocity,
        imageName,
        itemName,
        description,
        lifePenalty
      );
    }
  }

  generateFallingObject(): void {
    if (this.timeItemLastGenerated === undefined) {
      this.timeItemLastGenerated = Date.now();
      const randomObject = this.selectRandomObject();
      this.itemsToDraw.push(randomObject);
      FallingObject.onScreen.push(randomObject);
    } else {
      const currentTime = Date.now();
      const timeDifferenceInSeconds =
        (currentTime - this.timeItemLastGenerated) / 1000;

      let sumOfVelocities = 0;
      for (let item of FallingObject.onScreen) {
        sumOfVelocities += item.velocity * 60;
      }
      const avgVelocity = sumOfVelocities / FallingObject.onScreen.length;
      const avgTimeToFall = GameService.HEIGHT / avgVelocity;
      const intervalToGenerate = avgTimeToFall / this.maxObjectsOnScreen;
      if (timeDifferenceInSeconds > intervalToGenerate) {
        const randomObject = this.selectRandomObject();
        this.itemsToDraw.push(randomObject);
        FallingObject.onScreen.push(randomObject);
        this.timeItemLastGenerated = currentTime;
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
      if (this.scorekeeper!.score in Engine.SCORE_TO_MULTIPLIER_MAP) {
        this.increaseObjectSpeeds(
          Engine.SCORE_TO_MULTIPLIER_MAP[this.scorekeeper!.score]
        );
      }
    } else {
      this.lifekeeper!.addLives(stat);
    }
  }

  increaseObjectSpeeds(multiplier: number): void {
    this.velocityMultiplier = multiplier;
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

  pauseAndResume(action: 'pause' | 'resume'): void {
    if (action === 'pause') {
      clearInterval(this.interval);
      // this.ctx.clearRect(0, 0, GameService.WIDTH, GameService.HEIGHT);
    } else if (action === 'resume') {
      this.interval = setInterval(() => this.refreshScreen(), 1000 / 60);
    }
  }
}

export default class GameService {
  static WIDTH: number = 300;
  static HEIGHT: number = 600;
  static BACKGROUND_COLOUR: string = 'cornflowerblue';
  engine: Engine;
  menu: Menu;
  gameState: 'notStarted' | 'started' | 'paused' | 'gameOver' = 'notStarted';

  constructor() {
    const gameContainer = document.querySelector('.game-container')!;
    this.engine = new Engine(gameContainer);
    this.menu = new Menu(gameContainer);
    window.addEventListener('keydown', (e) => this.listenToKeypress(e));
  }

  listenToKeypress(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.gameState === 'notStarted') {
      this.gameState = 'started';
      this.menu.receiveKeypress();
      this.engine.startGame();
    } else if (e.key === 'ArrowRight' && this.gameState === 'started') {
      this.engine.receiveArrowKey('right');
    } else if (e.key === 'ArrowLeft' && this.gameState === 'started') {
      this.engine.receiveArrowKey('left');
    } else if (
      (e.key === 'p' || e.key === 'P') &&
      this.gameState === 'started'
    ) {
      this.gameState = 'paused';
      this.menu.receiveKeypress();
      this.engine.pauseAndResume('pause');
    } else if (
      (e.key === 'p' || e.key === 'P') &&
      this.gameState === 'paused'
    ) {
      this.gameState = 'started';
      this.menu.receiveKeypress();
      this.engine.pauseAndResume('resume');
    }
  }
}

const gameService = new GameService();
