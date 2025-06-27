abstract class Renderable {
  protected ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Not able to get canvas context!');

    this.ctx = ctx;
  }

  abstract render(): void;
}

export default Renderable;
