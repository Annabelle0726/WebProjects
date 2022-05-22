const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;
const WINNINGMESSAGE = document.getElementById("winningMessage");
const WINNING_TEXT = document.querySelector('[data-winning-message-text]')
const WINNER_COMBINATION = [
    [0, 1, 2], [1, 4, 7], [2, 5, 8], [0, 3, 6], [0, 4, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];
const RESTART_BTN = document.getElementById("restartButton");
const board = document.getElementById('board');


startGame();
RESTART_BTN.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    })
    setBoardHover();
    board.classList.remove('hide');
    WINNINGMESSAGE.classList.remove("show");
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function endGame(draw) {
    if (draw) {
        WINNING_TEXT.innerText = "Draw";
    } else {
        WINNING_TEXT.innerText = `${circleTurn ? " O's" : " X's"} Win!`
    }
    board.classList.add('hide');
    WINNINGMESSAGE.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHover();
    }
}

function checkWin(currentClass) {
    return WINNER_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}