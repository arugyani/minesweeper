import Genetic from './engine/genetic.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx) {
  const bot = new Genetic(canvas);

  const start = document.getElementById('start');
  start?.addEventListener('click', () => {
    bot.start();
  });

  const stop = document.getElementById('stop');
  stop?.addEventListener('click', () => {
    bot.stop();
  });
} else {
  // TODO: Safely handle failure to get canvas.
}
