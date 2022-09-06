import ObjectOnScreen from './ObjectOnScreen';
import GameService from '../index';

export default class Paddle extends ObjectOnScreen {
  static COLOUR: string = 'blue';
  static WIDTH: number = 80;
  static HEIGHT: number = 20;
  static SPEED: number = 10;
  #x: number;
  #y: number;
  constructor() {
    super();
    this.#x = (GameService.WIDTH - Paddle.WIDTH) / 2;
    this.#y = GameService.HEIGHT - Paddle.HEIGHT;
  }
  get x(): number {
    return this.#x;
  }
  get y(): number {
    return this.#y;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.#x, this.#y, Paddle.WIDTH, Paddle.HEIGHT);
    ctx.fillStyle = Paddle.COLOUR;
    ctx.fill();
    ctx.closePath();
  }
  public move(direction: 'left' | 'right' | undefined): void {
    if (direction === 'left') {
      this.#x -= Paddle.SPEED;
    } else if (direction === 'right') {
      this.#x += Paddle.SPEED;
    }
  }
}
