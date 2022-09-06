import ObjectOnScreen from './ObjectOnScreen';

export default class Background extends ObjectOnScreen {
  #x: number = 0;
  #y: number = 0;
  #img: HTMLImageElement;
  constructor() {
    super();
    this.#img = document.createElement('img');
    this.#img.src = 'dist/images/background.png';
  }
  get x(): number {
    return this.#x;
  }
  get y(): number {
    return this.#y;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.#img, this.#x, this.#y);
  }
}
