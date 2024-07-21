document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('gameBoard');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let winProcessed = false;  // Flag to ensure wins are processed only once

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function createBoard() {
        board.innerHTML = '';
        boardState = Array(9).fill(null);
        winProcessed = false;  // Reset the flag when creating a new board
        currentPlayer = 'X';  // Always start with 'X'
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            cell.addEventListener('click', handleClick);
            board.appendChild(cell);
        }
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (boardState[index] || winProcessed) return;
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        processMove();
    }

    function makeComputerMove() {
        const bestMove = findBestMove();
        if (bestMove !== null) {
            boardState[bestMove] = currentPlayer;
            const cell = board.querySelector(`.cell[data-index='${bestMove}']`);
            cell.textContent = currentPlayer;
        }
        processMove();
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let move = null;

        for (let i = 0; i < 9; i++) {
            if (!boardState[i]) {
                boardState[i] = 'O';
                const score = minimax(boardState, 0, false);
                boardState[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        const scores = {
            'X': -1,
            'O': 1,
            'tie': 0
        };

        const result = checkWinner();
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (!board[i]) {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (!board[i]) {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function processMove() {
        const winner = checkWinner();
        if (winner && !winProcessed) {
            winProcessed = true;
            setTimeout(() => {
                showModal(`${winner} wins!`);
                updateWins(winner);
            }, 100);
            return; // Stop further processing
        } else if (!boardState.includes(null) && !winProcessed) {
            winProcessed = true;
            setTimeout(() => showModal('Draw!'), 100);
            return; // Stop further processing
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && !winProcessed) {
                setTimeout(makeComputerMove, 500);
            }
        }
    }

    function checkWinner() {
        for (const [a, b, c] of winningCombinations) {
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];  // Return the actual winner ('X' or 'O')
            }
        }
        return boardState.includes(null) ? null : 'tie';
    }

    function showModal(message) {
        document.getElementById('modalMessage').textContent = message;
        $('#gameModal').modal('show');
    }

    function updateWins(winner) {
        fetch('/update_wins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ winner: winner })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update wins response:', data); // Debugging line
            if (data.wins !== undefined) {
                document.getElementById('winCount').textContent = data.wins;
            }
            if (data.opponent_wins !== undefined) {
                document.getElementById('opponentWinCount').textContent = data.opponent_wins;
            }

            updateWinRatio(data.wins, data.opponent_wins);
            setTimeout(createBoard, 1000); // Reset the board after a short delay
        })
        .catch(error => console.error('Error:', error));
    }

    function updateWinRatio(userWins, opponentWins) {
        let winRatio = 'N/A';
        if (opponentWins > 0) {
            winRatio = (userWins / opponentWins).toFixed(2);
        }
        document.getElementById('winRatio').textContent = winRatio;
    }

    function fetchInitialWinData() {
        fetch('/get_initial_wins')
            .then(response => response.json())
            .then(data => {
                if (data.wins !== undefined) {
                    document.getElementById('winCount').textContent = data.wins;
                }
                if (data.opponent_wins !== undefined) {
                    document.getElementById('opponentWinCount').textContent = data.opponent_wins;
                }
                updateWinRatio(data.wins, data.opponent_wins);
            })
            .catch(error => console.error('Error fetching initial win data:', error));
    }

    function logout() {
        fetch('/logout')
            .then(response => response.text())
            .then(() => window.location.href = '/login')
            .catch(error => console.error('Error:', error));
    }

    document.getElementById('logoutButton').addEventListener('click', logout);

    fetchInitialWinData();  // Fetch initial win data when the page loads
    createBoard();
});
