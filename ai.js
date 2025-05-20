const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game");
const messageText = document.getElementById("message-text");
const winningMessageElement = document.getElementById("winning-message");

const X_CLASS = "x";
const O_CLASS = "o";

let xScore = 0;
let oScore = 0;
const xScoreElement = document.getElementById("x-score");
const oScoreElement = document.getElementById("o-score");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.add("hidden");
}

function handleClick(e) {
  const cell = e.target;
  placeMark(cell, X_CLASS);

  if (checkWin(X_CLASS)) return endGame("You");
  if (isDraw()) return endGame("Draw");

  setTimeout(computerMove, 500); // Small delay for realism
}

function computerMove() {
  const availableCells = [...cells].filter(cell => 
    !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
  );

  if (availableCells.length === 0) return;

  const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  placeMark(randomCell, O_CLASS);

  if (checkWin(O_CLASS)) return endGame("Computer");
  if (isDraw()) return endGame("Draw");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.removeEventListener("click", handleClick);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].classList.contains(currentClass));
  });
}

function isDraw() {
  return [...cells].every(cell => 
    cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

function endGame(winner) {
  if (winner === "Draw") {
    messageText.textContent = "It's a Draw!";
  } else {
    messageText.textContent = `${winner} Wins!`;
    if (winner === "You") {
      xScore++;
      xScoreElement.textContent = xScore;
    } else if (winner === "Computer") {
      oScore++;
      oScoreElement.textContent = oScore;
    }
  }

  winningMessageElement.classList.remove("hidden");

  setTimeout(() => {
    startGame(); // Continue game automatically
  }, 2000);
}