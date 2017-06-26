/*----- app's state (variables) -----*/
var board, turn, squareClicked, whosWinner, gameFinished;

/*----- cached element references -----*/
var tbodyEl = document.querySelector('tbody');
var buttonEl = document.querySelector('button');
var squares = document.querySelectorAll('td');
var winner = document.getElementById('winner');

/*----- functions -----*/
initialize();
render();

function initialize(){
    board = [];
    for(var i = 0; i < 9; i++){
        board[i] = null;
    }
    turn = true; // true is X, false is O
    gameFinished = true;
    squares.forEach(function(el){
        el.textContent = '';
    });
    whosWinner = squareClicked = winner.textContent = '';
    // Event Listeners
    tbodyEl.addEventListener('click', handleClick);
    buttonEl.addEventListener('click', initialize);
}

function handleClick(evt){
    squareClicked = evt.target;
    // users cannot click on a square that was already used.
    // the square needs to be null
    if(board[squareClicked.id] === null){
        board[squareClicked.id] = turn;
        checkWin();
        render();
        turn = !turn;
    }    
    if(whosWinner) tbodyEl.removeEventListener('click', handleClick);
}

function render(){
    if(turn){
        squareClicked.textContent = 'X';
    } else {
        squareClicked.textContent = 'O';
    }

    if(whosWinner !== '') {
        winner.textContent = whosWinner;
    } 
}

function checkWin(){
    var player1 = 'Player 1!';
    var player2 = 'Player 2!';
    var tie = "It's a tie!";

    // check top row
    if(board[0] !== null && board[0] === board[1] && board[0] === board[2]){ 
        whosWinner = turn ? player1 : player2;
    } // check middle row
    else if(board[3] !== null && board[3] === board[4] && board[3] === board[5]){
        whosWinner = turn ? player1 : player2;
    } // check bottom row 
    else if(board[6] !== null && board[6] === board[7] && board[6] === board[8]){
        whosWinner = turn ? player1 : player2;
    } // check left column 
    else if(board[0] !== null && board[0] === board[3] && board[0] === board[6]){
        whosWinner = turn ? player1 : player2;
    } // check middle column 
    else if(board[1] !== null && board[1] === board[4] && board[1] === board[7]){
        whosWinner = turn ? player1 : player2;
    } // check right colum 
    else if(board[2] !== null && board[2] === board[5] && board[2] === board[8]){
        whosWinner = turn ? player1 : player2;
    } // check left to right \ 
    else if(board[0] !== null && board[0] === board[4] && board[0] === board[8]){
        whosWinner = turn ? player1 : player2;
    } // check right to left / 
    else if(board[2] !== null && board[2] === board[4] && board[2] === board[6]){
        whosWinner = turn ? player1 : player2;
    } // it's a tie 
    else {
        // check to see if the board is empty.
        // if the board is not empty, then it's done 
        board.forEach(function(el){
            if(el === null) gameFinished = false;
        });

        if(gameFinished) {
            whosWinner = tie;
        } else {
            gameFinished = true;
        }
    }
}