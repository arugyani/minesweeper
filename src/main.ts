import Board from './core/board.js';
import Random from './engine/random.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx) {
  const board = new Board(9, 9, 10, canvas);
  const bot = new Random(board);

  const reset = document.getElementById('reset');
  reset?.addEventListener('click', () => {
    board.reset();
    bot.stop();
  });

  const start = document.getElementById('start');
  start?.addEventListener('click', () => {
    board.reset();
    bot.start();
  });

  const stop = document.getElementById('stop');
  stop?.addEventListener('click', () => {
    bot.stop();
  });

  board.render();
} else {
  // TODO: Safely handle failure to get canvas.
}
