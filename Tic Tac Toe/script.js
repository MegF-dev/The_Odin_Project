const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let boardCell = document.querySelectorAll("[data-cell]");
const gameBoard = document.getElementById("board");
const winningMessageEl = document.getElementById("winningMessage");
const winningMessage = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restartButton");
let circleTurn;

startGame();
restartBtn.addEventListener("click", startGame);
function startGame() {
  circleTurn = false;

  boardCell.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageEl.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}
function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winningMessageEl.classList.add("show");
}
function isDraw() {
  return [...boardCell].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  gameBoard.classList.remove(X_CLASS);
  gameBoard.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    gameBoard.classList.add(CIRCLE_CLASS);
  } else {
    gameBoard.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return boardCell[index].classList.contains(currentClass);
    });
  });
}
