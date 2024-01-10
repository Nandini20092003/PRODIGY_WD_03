document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const modeSelector = document.getElementById('mode');
    const restartButton = document.querySelector('.buttons button');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    let mode = modeSelector.value;

    modeSelector.addEventListener('change', () => {
        mode = modeSelector.value;
        resetGame();
    });

    restartButton.addEventListener('click', () => {
        resetGame();
    });

    function resetGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        renderBoard();
        updateStatus();
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.textContent = board[i];
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        if (gameOver) return;

        const index = event.target.dataset.index;
        if (board[index] === '') {
            board[index] = currentPlayer;
            renderBoard();
            checkWinner();
            switchPlayer();
            updateStatus();

            if (mode === 'computer' && currentPlayer === 'O' && !gameOver) {
                playComputerTurn();
            }
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function updateStatus() {
        if (gameOver) {
            statusElement.textContent = `Game Over! ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        } else {
            statusElement.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    function playComputerTurn() {
        const availableMoves = board.reduce((acc, val, index) => {
            if (val === '') acc.push(index);
            return acc;
        }, []);

        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        if (randomMove !== undefined) {
            board[randomMove] = currentPlayer;
            renderBoard();
            checkWinner();
            switchPlayer();
            updateStatus();
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
                gameOver = true;
                updateStatus();
                return;
            }
        }

        if (!board.includes('')) {
            gameOver = true;
            statusElement.textContent = 'Game Over! It\'s a draw!';
        }
    }

    resetGame();
});
