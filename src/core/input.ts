import Board from './board.js';
import { noop } from './util.js';

class Input {
  canvas: HTMLCanvasElement;
  onClick: (e: MouseEvent) => void = noop;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('mousedown', e => this.onClick(e));
  }
}

export default Input;
