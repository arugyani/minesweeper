import Board from '../core/board.js';
import Cell from '../core/cell.js';
import { Status } from '../core/util.js';
import Bot from './bot.js';

class Random extends Bot {
  constructor(board: Board) {
    super(board);
  }

  solve() {
    const turn = () => {
      if (!this.running) return;
      if (this.board.status == Status.WINNER) {
        return;
      }

      if (this.board.status == Status.GAME_OVER) {
        this.board.reset();
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
    };

    requestAnimationFrame(turn);
  }
}

export default Random;
