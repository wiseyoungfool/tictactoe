function Gameboard() {
    let grid = [-1, -1, -1, -1, -1, -1, -1, -1, -1]

    const play = (cell, player) => {
        if (grid[cell]=== -1) {
            grid[cell] = player;
            document.getElementById(`${cell}`).innerHTML = `${player}`;
            return true;
        }
        else return false;
    };
    
    const resetGrid = () => {
        grid = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < 9; i++) {
            document.getElementById(`${i}`).innerHTML = "";
        }
    }
    const getGrid = () => grid;

    return { getGrid, play, resetGrid}
};

function GameController() {
    const board = Gameboard();

    const players = ['X', 'O']
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(board.getGrid());
        console.log(`${getActivePlayer()}'s Turn`);

        const instruction = document.getElementById("instruction");
        if (activePlayer==="X") {instruction.innerHTML = "X's Turn";}
        else {instruction.innerHTML = "O's Turn";}
    }

    const playRound = (cell) => {
        res = board.play(cell, getActivePlayer());
        
        win = checkWinState();

        if (res===true && win===false) {
            switchPlayerTurn();
            printNewRound();
        }
    }

    const checkWinState = () => {
        // check lineups
        winner = checkWinner();

        if (winner!=-1) {
            console.log(`${winner} wins!`);
            document.getElementById("instruction").textContent = `${winner} wins!! Board reset: X's turn.`;
            board.resetGrid();
            activePlayer = players[0];
            return true;
        }

        //check tie game
        gameEnd = true;
        for (let i=0; i < 9; i++) {
            if (board.getGrid()[i] === -1) {
                gameEnd = false;
                break;
            }
        }

        if (gameEnd === true) {
            console.log("Tie Game!");
            document.getElementById("instruction").textContent = "Tie Game! Board reset: X's turn.";
            board.resetGrid();
            activePlayer = players[0];
            return true;
        }

        return false;
    }

    const checkWinner = () => {
        b = board.getGrid();
        console.log("checking winner...")
        //check rows
        for (let i=0; i < 9; i+=3) {
            if (b[i] !== -1 && b[i] === b[i+1] && b[i+1] === b[i+2]) {
                console.log("matching row!");
                return b[i];
            }
        }
        //check columns
        for (let i=0; i < 3; i+=1) {
            if (b[i] !== -1 && b[i] === b[i+3] && b[i+3] === b[i+6]) {
                console.log("matching column!");
                return b[i];
            }
        }
        //check diagonals
        if ((b[0]===b[4] && b[4]===b[8]) || (b[2]===b[4] && b[4]===b[6])) {
            if (b[4]!=-1) console.log("matching diagonal!");
            return b[4];
        }
        
        return -1;
    }

    return {playRound, getActivePlayer}
}

const game = GameController();