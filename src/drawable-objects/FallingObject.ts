import GameService from '../index';
import ObjectOnScreen from './ObjectOnScreen';
import Paddle from './Paddle';

export default abstract class FallingObject extends ObjectOnScreen {
  static IMAGE_EXTENSION = 'dist/images/';
  static onScreen: FallingObject[] = [];
  #x: number;
  #y: number;
  #img: HTMLImageElement;
  hasCollided: boolean = false;
  isOnScreen: boolean = true;
  #velocity: number;

  constructor(x: number, y: number, velocity: number, imageName: string) {
    super();
    this.#x = x;
    this.#y = y;
    this.#velocity = velocity;
    this.#img = document.createElement('img');
    this.#img.src = `dist/images/${imageName}`;
  }

  get x(): number {
    return this.#x;
  }
  get y(): number {
    return this.#y;
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.#img, this.#x, this.#y);
  }
  protected move(): void {
    this.#y += this.#velocity;
  }
  protected updateOnscreenState(): void {
    if (this.#y > GameService.HEIGHT) {
      this.isOnScreen = false;
    }
  }
  protected updateCollisionState(startX: number): void {
    this.hasCollided =
      this.#x + this.#img.width > startX &&
      this.#x < startX + Paddle.WIDTH &&
      this.#y + this.#img.height > GameService.HEIGHT - Paddle.HEIGHT &&
      this.#y < GameService.HEIGHT;
    this.isOnScreen = !this.hasCollided;
  }
  public update(startX: number, updatePlayerStats: Function): void {
    this.move();
    this.updateCollisionState(startX);
    this.updateOnscreenState();
    if (this.hasCollided) {
      this.collisionEffect(updatePlayerStats);
    }
  }
  abstract collisionEffect(fn: Function): void;
}

export class ExtraLife extends FallingObject {
  static VELOCITY = 3;
  static IMAGE_NAME = 'life.png';
  #lifeBonus = 1;
  constructor(x: number, y: number, velocity: number, imageName: string) {
    super(x, y, velocity, imageName);
  }
  collisionEffect(updatePlayerStats: Function): void {
    updatePlayerStats('lives', this.#lifeBonus);
  }
}
