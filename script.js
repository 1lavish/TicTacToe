const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game");
const winningMessageElement = document.getElementById("winning-message");
const messageText = document.getElementById("message-text");
const restartButton = document.getElementById("restart-button");
const newButton = document.getElementById("new-button");

let oTurn;
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

startGame();

restartButton.addEventListener("click", startGame);
newButton.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.add("hidden");
}


function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? "o" : "x";
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function endGame(draw) {
  if (draw) {
    messageText.textContent = "Draw!";
  } else {
    messageText.textContent = `${oTurn ? "O" : "X"} Wins!`;
  }
  winningMessageElement.classList.remove("hidden");
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains("x") || cell.classList.contains("o"));
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

