import ObjectOnScreen from './ObjectOnScreen';

export default class Scorekeeper extends ObjectOnScreen {
  #score: number = 0;
  #x: number = 20;
  #y: number = 35;
  get score(): number {
    return this.#score;
  }
  get x(): number {
    return this.#x;
  }
  get y(): number {
    return this.#y;
  }
  addPoints(points: number): void {
    this.#score += points;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = 'bold 28px Courier New';
    ctx.fillStyle = 'white';
    ctx.fillText(this.score.toString(), this.#x, this.#y);
  }
}
