import Board from '../core/board.js';

abstract class Bot {
  startTime: number;
  endTime: number;

  protected board: Board;
  protected reset: HTMLButtonElement;

  protected running = false;

  constructor(board: Board) {
    this.board = board;

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
    this.running = false;

    alert(`Bot ran for ${(this.endTime - this.startTime) / 1000} seconds`);
  }

  abstract solve(): void;
}

export default Bot;
