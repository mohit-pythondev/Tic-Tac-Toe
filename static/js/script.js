document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('gameBoard');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    
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
        if (boardState[index] || checkWinner()) return;
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                updateWins();
            }, 100);
        } else if (!boardState.includes(null)) {
            setTimeout(() => alert('Draw!'), 100);
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        for (const [a, b, c] of winningCombinations) {
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }

    function updateWins() {
        fetch('/update_wins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('winCount').textContent = data.wins;
            setTimeout(createBoard, 1000); // Reset the board after a short delay
        })
        .catch(error => console.error('Error:', error));
    }

    function logout() {
        fetch('/logout')
            .then(response => response.text())  // Ensure the response is handled correctly
            .then(() => window.location.href = '/login')  // Redirect to login page
            .catch(error => console.error('Error:', error));
    }

    // Attach the logout function to the button
    document.getElementById('logoutButton').addEventListener('click', logout);

    createBoard();
});
