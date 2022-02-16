document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {cells: []}

function createBoard () {
  for (var r = 0; r < 6; r++) {
    for (var c = 0; c < 6; c++) {
        board.cells.push({
        row: r,
        col: c,
        isMine: Math.random() >= 0.8,
        isMarked: false,
        hidden: true,
        surroundingMines: 0,
      })
    }
  }
}

createBoard()

function startGame () {
  // Don't remove this function call: it makes the game work!
  for(var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  } 
  lib.initBoard()
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?


// 2. Are all of the mines marked?
function checkForWin () {
  for(var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine === true && !board.cells[i].isMarked === true) {
      return
    }
    if (!board.cells[i].isMine && board.cells[i].hidden) {
      return 
    } 
  }
  lib.displayMessage('You win!') 
  winSound()
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let count = 0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for(var i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine === true){
      count++
    } 
  } 
  return count
}

function winSound () {
  var audio = new Audio('audio/win.wav');
  audio.play();
}
