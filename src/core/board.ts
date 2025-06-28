import Cell from './cell.js';
import Renderable from './render.js';
import Input from './input.js';
import { Status } from './util.js';

class Board extends Renderable {
  width: number;
  height: number;
  mines: number;
  status: Status;

  private board: Cell[][];
  private input: Input;
  private populated: boolean = false;

  constructor(
    width: number,
    height: number,
    mines: number,
    canvas: HTMLCanvasElement,
  ) {
    super(canvas);

    this.width = width;
    this.height = height;
    this.mines = mines;

    canvas.width = width * Cell.SIZE;
    canvas.height = height * Cell.SIZE;

    this.input = new Input(canvas);
    this.input.onClick = e => this.click(e);

    this.board = Array.from(Array(height), () => Array(width).fill(null));
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        this.board[row][col] = new Cell(row, col, this, canvas);
      }
    }

    this.status = Status.NEW_GAME;
  }

  reset() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j].reset();
      }
    }

    this.populated = false;
    this.status = Status.NEW_GAME;

    this.render();
  }

  populate(firstX?: number, firstY?: number) {
    const length = this.width * this.height;
    const positions = Array.from({ length }, (_, i) => i);

    for (let i = 0; i < this.mines; i++) {
      const j = i + Math.floor(Math.random() * (length - i));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    for (let i = 0; i < this.mines; i++) {
      const pos = positions[i];

      const row = Math.floor(pos / this.height);
      const col = pos % this.width;

      if (firstX == col && firstY == row) continue;

      this.board[row][col].isMine = true;
      this.board[row][col].iterateNeighbors((row, col) => {
        const cell = this.board[row][col];
        cell.adjacentMines += 1;
      });
    }

    this.populated = true;
  }

  getCell(row: number, col: number) {
    if (row < 0 || row >= this.height)
      throw new Error('Invalid getCell call - row out of bounds');
    if (col < 0 || col >= this.width)
      throw new Error('Invalid getCell call - col out of bounds');

    return this.board[row][col];
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j].render();
      }
    }
  }

  checkWin() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (!this.board[i][j].isMine && !this.board[i][j].isCleared)
          return false;
      }
    }

    return true;
  }

  click(e: MouseEvent) {
    if (this.status == Status.GAME_OVER || this.status == Status.WINNER) return;

    const { offsetX: x, offsetY: y } = e;

    const cellX = Math.floor(x / 40);
    const cellY = Math.floor(y / 40);

    if (this.populated) {
      this.board[cellY][cellX].click(e);
    } else {
      this.populate(cellX, cellY);
      this.board[cellY][cellX].click(e);
      this.status = Status.IN_GAME;
    }

    if (this.checkWin()) {
      this.status = Status.WINNER;
    }

    this.render();
    this.updateTitle();
  }

  updateTitle() {
    const title = document.getElementById('title');
    if (!title) return;

    switch (this.status) {
      case Status.GAME_OVER:
        title.textContent = 'Game Over';
        break;
      case Status.NEW_GAME:
        title.textContent = 'New Game';
        break;
      case Status.IN_GAME:
        title.textContent = 'In Game';
        break;
      case Status.WINNER:
        title.textContent = 'Winner';
        break;
    }
  }
}

export default Board;
