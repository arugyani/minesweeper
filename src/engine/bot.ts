import Board from '../core/board.js';

abstract class Bot {
  startTime: number;
  endTime: number;

  protected board: Board;
  protected reset: HTMLButtonElement;

  protected running = false;

  constructor(canvas: HTMLCanvasElement) {
    this.board = new Board(9, 9, 10, canvas);
    this.board.render();

    this.startTime = 0;
    this.endTime = 0;

    this.reset = document.getElementById('reset') as HTMLButtonElement;
  }

  start() {
    this.running = true;
    this.startTime = performance.now();
    this.solve();
  }

  stop() {
    this.endTime = performance.now();

    if (this.running) {
      console.log(
        `Bot ran for ${(this.endTime - this.startTime) / 1000} seconds`,
      );
    }

    this.board.reset();
    this.running = false;
  }

  abstract solve(): void;
}

export default Bot;
