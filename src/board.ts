import Cell from './cell.js';
import Renderable from './render.js';
import Input from './input.js';

class Board extends Renderable {
  width: number;
  height: number;
  mines: number;

  private board: Cell[][];
  private input: Input;

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

    this.populate();
  }

  populate() {
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

      this.board[row][col].isMine = true;
      this.board[row][col].iterateNeighbors((row, col) => {
        const cell = this.board[row][col];
        cell.adjacentMines += 1;
      });
    }
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

  click(e: MouseEvent) {
    const { offsetX: x, offsetY: y } = e;

    const cellX = Math.floor(x / 40);
    const cellY = Math.floor(y / 40);

    this.board[cellY][cellX].click(e);
    this.render();
  }
}

export default Board;
