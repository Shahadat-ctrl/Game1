const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize game
function startGame() {
    cells.forEach((cell) => {
        cell.classList.remove("taken", "winning", "draw");
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    statusText.textContent = "Player X's Turn";
    currentPlayer = "X";
    gameActive = true;
}

// Handle cell click
function handleClick(e) {
    const cell = e.target;

    if (!gameActive) return;

    // Mark cell
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    // Check win or draw
    if (checkWin(currentPlayer)) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        highlightWinningCells(currentPlayer);
        gameActive = false;
        return;
    } else if (isDraw()) {
        statusText.textContent = "It's a Draw!";
        highlightDraw();
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check if current player wins
function checkWin(player) {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cells[index].textContent === player;
        });
    });
}

// Highlight winning cells
function highlightWinningCells(player) {
    winningCombinations.forEach((combination) => {
        if (combination.every((index) => cells[index].textContent === player)) {
            combination.forEach((index) => {
                cells[index].classList.add("winning");
            });
        }
    });
}

// Highlight draw cells
function highlightDraw() {
    cells.forEach((cell) => {
        cell.classList.add("draw");
    });
}

// Check for draw
function isDraw() {
    return [...cells].every((cell) => {
        return cell.textContent === "X" || cell.textContent === "O";
    });
}

// Restart game
restartButton.addEventListener("click", startGame);

// Start the game for the first time
startGame();