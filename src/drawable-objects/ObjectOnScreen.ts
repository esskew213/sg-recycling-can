export default abstract class ObjectOnScreen {
  abstract get x(): number;
  abstract get y(): number;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
