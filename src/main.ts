// const canvas = document.getElementById('game') as HTMLCanvasElement;

// const ctx = canvas.getContext('2d');

// if (ctx) {
//   mines();
// } else {
//   console.log('Canvas not enabled!');
// }

// type Cell = {
//   isMine: boolean;
//   isCleared: boolean;
//   isFlagged: boolean;
//   neighborCount: number;
// };

// function mines() {
//   let rows = 9;
//   let cols = 9;
//   let mines = 12;

//   canvas.width = rows * 40;
//   canvas.height = cols * 40;

//   const board = Array.from(Array(rows), () =>
//     Array.from(
//       Array(cols),
//       () =>
//         ({
//           isMine: false,
//           isCleared: false,
//           neighborCount: 0,
//         }) as Cell,
//     ),
//   );

//   let mask = [
//     [true, true, true],
//     [true, false, true],
//     [true, true, true],
//   ];

//   while (mines != 0) {
//     let minePlaced = false;

//     const row = Math.floor(Math.random() * rows);
//     const col = Math.floor(Math.random() * rows);

//     if (!board[row][col].isMine) {
//       board[row][col].isMine = true;
//       minePlaced = true;

//       for (let i = 0; i < mask.length; i++) {
//         for (let j = 0; j < mask[i].length; j++) {
//           let x = i - 1;
//           let y = j - 1;

//           if (row + x >= 0 && row + x < rows) {
//             if (col + y >= 0 && col + y < cols) {
//               if (mask[i][j]) {
//                 board[row + x][col + y].neighborCount += 1;
//               }
//             }
//           }
//         }
//       }
//     }

//     mines--;
//   }

//   drawBoard(board);
//   let cleared = 0;

//   canvas.addEventListener('contextmenu', e => {
//     e.preventDefault();
//   });

//   canvas.addEventListener('mousedown', event => {
//     const {offsetX: x, offsetY: y, button} = event;

//     const cellX = Math.floor(y / 40);
//     const cellY = Math.floor(x / 40);

//     console.log('click!', button);

//     if (button == 0) {
//       if (board[cellY][cellX].isFlagged) return;
//       if (board[cellY][cellX].isMine) alert('YOU LOSE LOSE LOSER');
//       else if (
//         !board[cellY][cellX].isCleared &&
//         !board[cellY][cellX].isFlagged
//       ) {
//         board[cellY][cellX].isCleared = true;
//         cleared += 1;
//       }
//     } else if (button == 2) {
//       if (!board[cellY][cellX].isCleared) {
//         board[cellY][cellX].isFlagged = !board[cellY][cellX].isFlagged;
//         console.log('flagged!', board[cellY][cellX].isFlagged);
//       }
//     } else if (button == 1) {
//       console.log(board[cellY][cellX]);
//     }

//     drawBoard(board);
//   });
// }

// function drawBoard(board: Cell[][]) {
//   if (!ctx) return;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       ctx.strokeRect(i * 40, j * 40, 40, 40);

//       if (board[i][j].isFlagged) ctx.fillText(`F`, i * 40 + 20, j * 40 + 20);
//       else if (board[i][j].isMine || !board[i][j].isCleared) continue;
//       else
//         ctx.fillText(`${board[i][j].neighborCount}`, i * 40 + 20, j * 40 + 20);
//     }
//   }
// }
