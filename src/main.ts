import Board from './core/board.js';
import { Status } from './core/util.js';
import Bot from './engine/bot.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx) {
  const board = new Board(50, 50, 500, canvas);
  const bot = new Bot(board, 'random');

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

  const title = document.getElementById('status');
  document.addEventListener('click', () => {
    if (title) {
      if (board.status == Status.NEW_GAME) title.textContent = 'New Game';
      else if (board.status == Status.IN_GAME) title.textContent = 'Playing';
      else if (board.status == Status.GAME_OVER)
        title.textContent = 'Game Over';
      else if (board.status == Status.WINNER) title.textContent = 'Winner';
    }
  });

  board.render();
} else {
  // TODO: Safely handle failure to get canvas.
}
