import ObjectOnScreen from './ObjectOnScreen';
import GameService from '../index';
export default class Lifekeeper extends ObjectOnScreen {
  static MAX_LIVES = 3;

  #lives: number = 3;
  #x: number = GameService.WIDTH - 40;
  #y: number = 10;
  #img: HTMLImageElement;

  constructor() {
    super();
    this.#img = document.createElement('img');
    this.#img.src = `dist/images/life.png`;
  }
  get lives(): number {
    return this.#lives;
  }
  get x(): number {
    return this.#x;
  }
  get y(): number {
    return this.#y;
  }
  addLives(lifeBonus: number): void {
    const newNumberOfLives = this.#lives + lifeBonus;
    this.#lives = Math.min(Lifekeeper.MAX_LIVES, newNumberOfLives);
    if (newNumberOfLives === 0) {
      document.location.reload();
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.#lives; i++) {
      ctx.drawImage(this.#img, this.#x - (this.#img.width + 10) * i, this.#y);
    }
  }
}
