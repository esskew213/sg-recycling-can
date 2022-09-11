import ObjectOnScreen from './ObjectOnScreen';
import GameService from '../index';

export default class Paddle extends ObjectOnScreen {
  static SPEED: number = 10;

  #x: number;
  #y: number;
  #img: HTMLImageElement;
  constructor() {
    super();
    this.#img = document.createElement('img');
    this.#img.src = 'dist/images/blueBin.png';
    console.log('paddle drawn');

    this.#x = 0;
    this.#y = 0;

    this.#img.onload = () => {
      this.#x = (GameService.WIDTH - this.#img.width) / 2;
      this.#y = GameService.HEIGHT - this.#img.height;
    };
  }
  get x(): number {
    return this.#x;
  }
  get y(): number {
    return this.#y;
  }
  get width(): number {
    return this.#img.width;
  }
  get height(): number {
    return this.#img.height;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.#img, this.#x, this.#y);
  }
  public move(direction: 'left' | 'right' | undefined): void {
    if (direction === 'left') {
      this.#x -= Paddle.SPEED;
    } else if (direction === 'right') {
      this.#x += Paddle.SPEED;
    }
  }
}
