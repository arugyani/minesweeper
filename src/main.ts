import Board from './board.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx) {
  const board = new Board(9, 9, 10, canvas);

  board.render();
} else {
  // TODO: Safely handle failure to get canvas.
}
