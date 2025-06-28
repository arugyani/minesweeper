import Board from './board.js';
import Renderable from './render.js';
import { Status } from './util.js';

class Cell extends Renderable {
  isMine: boolean = false;
  isCleared: boolean = false;
  isFlagged: boolean = false;

  adjacentMines: number = 0;

  row: number;
  col: number;
  board: Board;

  static SIZE = 40;

  constructor(
    row: number,
    col: number,
    board: Board,
    canvas: HTMLCanvasElement,
  ) {
    super(canvas);

    this.row = row;
    this.col = col;
    this.board = board;
  }

  reset() {
    this.isMine = false;
    this.isCleared = false;
    this.isFlagged = false;
    this.adjacentMines = 0;
  }

  reveal() {
    if (this.isFlagged) return;
    if (this.isMine) {
      this.board.status = Status.GAME_OVER;
    } else {
      this.isCleared = true;

      if (this.adjacentMines > 0) return;
      this.clearNeighbors();
    }
  }

  clearNeighbors(unsafe?: boolean) {
    this.iterateNeighbors((row, col) => {
      const cell = this.board.getCell(row, col);

      if (cell.isMine && !unsafe) return;
      if (cell.isFlagged || cell.isCleared) return;
      else cell.reveal();
    });
  }

  iterateNeighbors(callback: (row: number, col: number) => void) {
    const directions = [-1, 0, 1];
    for (const dx of directions) {
      for (const dy of directions) {
        if (dx === 0 && dy === 0) continue;

        const newRow = this.row + dy;
        const newCol = this.col + dx;

        if (
          newRow >= 0 &&
          newRow < this.board.height &&
          newCol >= 0 &&
          newCol < this.board.width
        ) {
          callback(newRow, newCol);
        }
      }
    }
  }

  chord() {
    let flagged = 0;
    this.iterateNeighbors((row, col) => {
      const cell = this.board.getCell(row, col);

      if (cell.isFlagged) flagged += 1;
    });

    if (flagged == this.adjacentMines) {
      this.clearNeighbors(true);
    }
  }

  toggleFlag() {
    if (this.isCleared) return;

    this.isFlagged = !this.isFlagged;
  }

  render() {
    const x = this.col * Cell.SIZE;
    const y = this.row * Cell.SIZE;

    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(x, y, Cell.SIZE, Cell.SIZE);

    if (this.isFlagged)
      this.ctx.fillText('F', x + Cell.SIZE / 2, y + Cell.SIZE / 2);
    else if (this.isCleared && !this.isMine && this.adjacentMines != 0) {
      if (this.adjacentMines === 1) this.ctx.fillStyle = 'blue';
      else if (this.adjacentMines === 2) this.ctx.fillStyle = 'green';
      else if (this.adjacentMines === 3) this.ctx.fillStyle = 'red';
      else if (this.adjacentMines === 4) this.ctx.fillStyle = '#00007c';
      else if (this.adjacentMines === 5) this.ctx.fillStyle = '#7c0001';
      else if (this.adjacentMines === 6) this.ctx.fillStyle = '#007d7c';
      else if (this.adjacentMines === 7) this.ctx.fillStyle = 'black';
      else if (this.adjacentMines === 8) this.ctx.fillStyle = '#7c7c7c';

      this.ctx.font = 'bold 16px sans-serif';

      this.ctx.fillText(
        `${this.adjacentMines}`,
        x + Cell.SIZE / 2 - 4,
        y + Cell.SIZE / 2 + 4,
      );
    } else if (!this.isCleared) {
      this.ctx.fillStyle = 'grey';
      this.ctx.fillRect(x, y, Cell.SIZE, Cell.SIZE);
    }
  }

  click(e: MouseEvent) {
    const { button } = e;

    switch (button) {
      case 0: // Left Click
        if (this.isCleared) this.chord();
        else this.reveal();
        break;
      case 2: // Right Click
        this.toggleFlag();
        break;
    }
  }
}

export default Cell;
