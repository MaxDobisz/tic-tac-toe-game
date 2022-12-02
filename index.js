const gridFields = document.querySelectorAll('.game-grid__box');
const resetButton = document.querySelector('.reset');
const message = document.querySelector('.message');
const winnerMessage = document.querySelector('.winner-message');
const winningFieldsArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let playerToMove = 'X';

const fieldClickHandler = e => {
    const clickedField = e.currentTarget;

    if (!clickedField.innerText) {
        clickedField.innerText = `${playerToMove}`;
        changePlayer();
        checkForWinner();
    }
}

gridFields.forEach(field => {
    field.addEventListener('click', fieldClickHandler);
});

const changePlayer = () => {
    if (playerToMove === 'X') {
        playerToMove = 'O';
        message.innerText = 'NOUGHTS\' TURN';
    } else {
        playerToMove = 'X';
        message.innerText = 'CROSSES\' TURN';
    }
}

const checkForWinner = () => {
    let gridFieldsClickedByX = [];
    let gridFieldsClickedByO = [];

    gridFields.forEach(field => {
        if (field.textContent === 'X') {
            gridFieldsClickedByX.push(parseInt(field.id));
        }
        if (field.textContent === 'O') {
            gridFieldsClickedByO.push(parseInt(field.id));
        }
    });

    if (gridFieldsClickedByX.length >= 3 && checkIfPlayerWinning(gridFieldsClickedByX)) {
        return declareWinner('CROSSES');
    } else if (gridFieldsClickedByO.length >= 3 && checkIfPlayerWinning(gridFieldsClickedByO)) {
        return declareWinner('NOUGHTS');
    } else if (gridFieldsClickedByX.length + gridFieldsClickedByO.length === 9) {
        return declareWinner('DRAW');
    }
}

const checkIfPlayerWinning = (gridFieldsClickedByPlayer) => {
    let isWinning = false;

    winningFieldsArr.forEach(winningFields => {
        if (winningFields.every(el => gridFieldsClickedByPlayer.includes(el))) {
            isWinning = true;
        }
    });
    winnerMessage
    return isWinning;
}

const declareWinner = winner => {
    if (winner === 'DRAW') {
        winnerMessage.innerText = `DRAW!`;
    } else {
        winnerMessage.innerText = `${winner} WIN!`;
    }

    gridFields.forEach(field => {
        field.removeEventListener('click', fieldClickHandler);
    });

    message.innerText = `FINISH`;
    winnerMessage.classList.add('winner-message--active');
};

const resetBoard = () => {
    gridFields.forEach(field => {
        field.innerText = '';
    });

    gridFields.forEach(field => {
        field.addEventListener('click', fieldClickHandler);
    });

    playerToMove = 'X';
    message.innerText = 'CROSSES START';
    winnerMessage.classList.remove('winner-message--active');
}

resetButton.addEventListener('click', resetBoard);