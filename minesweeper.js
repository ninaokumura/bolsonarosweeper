document.addEventListener('DOMContentLoaded', startGame);

// Define your `board` object here!
// var board = {
//   cells: [
//     { row: 0, col: 0, isMine: true, isMarked: false, hidden: true },
//     { row: 0, col: 1, isMine: false, isMarked: false, hidden: true },
//     { row: 0, col: 2, isMine: true, isMarked: false, hidden: true },

//     { row: 1, col: 0, isMine: false, isMarked: false, hidden: true },
//     { row: 1, col: 1, isMine: false, isMarked: false, hidden: true },
//     { row: 1, col: 2, isMine: true, isMarked: false, hidden: true },

//     { row: 2, col: 0, isMine: false, isMarked: false, hidden: true },
//     { row: 2, col: 1, isMine: false, isMarked: false, hidden: true },
//     { row: 2, col: 2, isMine: true, isMarked: false, hidden: true },
//   ],
// };
// console.log(board);

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
  //Write a for loop
  for (let i = 0; i < board.cells.length; i++) {
    // const countCells = board.cells[i];
    //Create a new property called surroundingMines and add to all objects
    board.cells[i]['surroundingMines'] = countSurroundingMines(board.cells[i]);
    // countCells["surroundingMines"] = countSurroundingMines(countCells);
    // console.log(countCells);
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard();
  //Add event listeners to allow the player to do a right and left click
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  //Reset the game
  const resetBtn = document.querySelector('#reset-btn');
  // console.log(resetBtn);
  resetBtn.onclick = resetGame;
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin(evt) {
  evt.preventDefault();
  let hasUnmarkedMines = false;
  let hasHiddenCells = false;
  let hasExploded = false;
  //This function should loop through all of boards.cells
  board.cells.forEach(cell => {
    //Write the condition
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
  //Check if all of the cells that are not mine are visible
  //Check if all mines are marked
  if (hasExploded && !board.playedBombSound) {
    // console.log('Boom');
    const explosionSound = new Audio('./bomb.mp3');
    explosionSound.play();
    board.playedBombSound = true;
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  if (!hasUnmarkedMines || !hasHiddenCells) {
    lib.displayMessage('You win!');
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  //create a variable counter to save all the cells which contains mines
  let counter = 0;
  //Use the function getSurroundingCells()
  const surroundingCells = getSurroundingCells(cell.row, cell.col);
  // console.log(surroundingCells);
  //Write a condition to find the surrounded cells
  for (let i = 0; i < surroundingCells.length; i++) {
    //Check if cells has the property isMine === true
    if (surroundingCells[i].isMine === true) {
      counter++;
    }
  }
  //Then return the correct count
  return counter;
}

function resetGame() {
  window.location.reload();
}
