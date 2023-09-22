let rounds = 9;
let currentPlayer = "X";
let xMoves = [];
let oMoves = [];
let winnerCells = [];
let playedCell = [];
let grid = document.querySelectorAll(".cell");
let winnerLine = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

function startGame() {
    grid.forEach(function(cell) {cell.addEventListener("click", function() {
            const id = cell.id;
            playGame(id);
        });
    });
}

startGame();

function playGame(id) {
    let cell = document.getElementById(id);
    if (!playedCell.includes(id) && winnerCells.length === 0) {
        --rounds;
        cell.innerText = currentPlayer;
        if (currentPlayer === "X") {
            xMoves.push(Number(id));
            checkWinnerLine(xMoves, "X player wins!!");
            currentPlayer = "O";
         } else {
            oMoves.push(Number(id));
            checkWinnerLine(oMoves, "O player wins!!");
            currentPlayer = "X";
         } 
        if (rounds === 0) {
        	gameOver("It's a draw!");
        } 
    } else if (!playedCell.includes(id)) {
        playedCell.push(id);
    }
}

function checkWinnerLine(array, text) {
    winnerLine.forEach(combo => {
        if (combo.every(element => array.includes(element))) {
            winnerCells = combo;
            gameOver(text);
        }
    });
}

function gameOver(text) {
    let textBox = document.getElementById('messageBox');
    textBox.innerText = text;
    if (winnerCells.length > 0) { 
        grid.forEach(cell =>  {if (winnerCells.includes(Number(cell.id))) {
                cell.style.backgroundColor = "lightgreen";
            }
        });
    }
}

function restart() {  
    location.reload();
}
