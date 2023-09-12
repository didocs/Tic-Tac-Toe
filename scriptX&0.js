let rounds = 9,
    currentPlayer = "O",
    Xmoves = [],
    Omoves = [],
    winnerCells = [],
    playedCell = [],
    grid = document.querySelectorAll(".cell"),
    winnerLine = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

grid.forEach(function(cell) {
    cell.addEventListener("click", function() {
        const id = cell.id;
        playGame(id);
    });
});

function playGame(id) {
    let cell = document.getElementById(id);
    if (!playedCell.includes(id) && winnerCells.length === 0) {
        --rounds;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        cell.innerText = currentPlayer;
        currentPlayer === "X" ? Xmoves.push(Number(id)) : Omoves.push(Number(id));
        rounds === 0 ? gameOver(2) : null;
    }
    checkWinnerLine(Xmoves) ? gameOver(0) : null;
    checkWinnerLine(Omoves) ? gameOver(1) : null;
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
        grid.forEach(cell => winnerCells.includes(Number(cell.id)) ? 
        cell.style.backgroundColor = "lightgreen" : null);
    }
}

function restart() {
    location.reload();
}
