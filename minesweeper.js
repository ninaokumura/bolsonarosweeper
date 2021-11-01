document.addEventListener('DOMContentLoaded', startGame);

function createBoard(boardSize) {
  const cells = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const isMine = Math.random() > 0.8;
      const cell = {
        row: x,
        col: y,
        isMine: isMine,
        isMarked: false,
        hidden: true,
      };
      cells.push(cell);
    }
  }
  return cells;
}

const board = { cells: createBoard(6), playedBombSound: false };

function startGame() {
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i]['surroundingMines'] = countSurroundingMines(board.cells[i]);
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard();

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  //Reset the game
  const resetBtn = document.querySelector('#reset-btn');

  resetBtn.onclick = resetGame;
}

function checkForWin(evt) {
  evt.preventDefault();
  let hasUnmarkedMines = false;
  let hasHiddenCells = false;
  let hasExploded = false;

  board.cells.forEach(cell => {
    if (cell.isMine) {
      if (!cell.isMarked) {
        hasUnmarkedMines = true;
        if (!cell.hidden) {
          hasExploded = true;
        }
      }
    } else {
      if (cell.hidden) {
        hasHiddenCells = true;
      }
    }
  });

  if (hasExploded && !board.playedBombSound) {
    const explosionSound = new Audio('./bomb.mp3');
    explosionSound.play();
    board.playedBombSound = true;
  }

  if (!hasUnmarkedMines || !hasHiddenCells) {
    lib.displayMessage('You won!');
  }
}

function countSurroundingMines(cell) {
  let counter = 0;

  const surroundingCells = getSurroundingCells(cell.row, cell.col);

  for (let i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true) {
      counter++;
    }
  }

  return counter;
}

function resetGame() {
  window.location.reload();
}
