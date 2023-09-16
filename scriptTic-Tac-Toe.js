let rounds = 9;
let currentPlayer = "O";
let xMoves = [];
let oMoves = [];
let winnerCells = [];
let playedCell = [];
let grid = document.querySelectorAll(".cell");
let winnerLine = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

function startGame() {
    grid.forEach(function(cell) {
        cell.addEventListener("click", function() {
            const id = cell.id;
            playGame(id);
        });
    });
}

function playGame(id) {
    let cell = document.getElementById(id);
    if (!playedCell.includes(id) && winnerCells.length === 0) {
        --rounds;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        cell.innerText = currentPlayer;
         if (currentPlayer === "X") {
            xMoves.push(Number(id));
        } else { 
            oMoves.push(Number(id));
        }
        rounds === 0 ? gameOver(2) : null;
    }
    checkWinnerLine(xMoves) ? gameOver(0) : null;
    checkWinnerLine(oMoves) ? gameOver(1) : null;
    playedCell.includes(id) ? true : playedCell.push(id);
}

function checkWinnerLine(array) {
    let winner = 0;
    winnerLine.forEach(combo => {
        if (combo.every(element => array.includes(element))) {
            winnerCells = combo;
            winner = 1;
        }
    });
    return winner === 1;
}

function gameOver(index) {
    let text = ["X player wins!!", "O player wins!!", "It's a draw!"];
    let textBox = document.getElementById('messageBox');
    textBox.innerText = text[index];
    if (winnerCells.length > 0) {
        grid.forEach(cell => winnerCells.includes(Number(cell.id)) ? cell.style.backgroundColor = "lightgreen" : null);
    }
}

function restart() {
    location.reload();
}
