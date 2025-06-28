import { request } from 'http';
import Board from '../core/board.js';
import Cell from '../core/cell.js';
import { Status } from '../core/util.js';

type BotStyle = 'random';

class Bot {
  style: BotStyle;

  private board: Board;
  private reset: HTMLButtonElement;

  private running = false;

  constructor(board: Board, style: BotStyle) {
    this.board = board;
    this.style = style;

    this.reset = document.getElementById('reset') as HTMLButtonElement;
  }

  start() {
    this.running = true;

    if (this.style == 'random') this.random();
  }

  stop() {
    this.running = false;
  }

  random() {
    let attempts = 0;

    const turn = () => {
      if (!this.running) return;
      if (this.board.status == Status.WINNER) {
        console.log(`Total Attempts: ${attempts}`);
        return;
      }

      if (this.board.status == Status.GAME_OVER) {
        this.board.reset();
        console.log(`Attempt ${attempts}`);
        attempts += 1;
      } else {
        const randomRow = Math.floor(Math.random() * this.board.height);
        const randomCol = Math.floor(Math.random() * this.board.width);

        this.board.click({
          offsetX: randomCol * Cell.SIZE + Cell.SIZE / 2,
          offsetY: randomRow * Cell.SIZE + Cell.SIZE / 2,
          button: 0,
        } as MouseEvent);
      }

      requestAnimationFrame(turn);
      // setTimeout(() => {
      // }, 0);
    };

    requestAnimationFrame(turn);
  }
}

export default Bot;
