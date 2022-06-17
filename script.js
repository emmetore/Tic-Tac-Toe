const playerWinBanner = $('.announce');

const cell = document.getElementsByClassName('cell');
const resetButton = document.getElementById('reset');
const announce = document.getElementsByClassName('announce');
const O = 'O';
const X = 'X';
let currentPlayer = X;
let spaces = Array(9).fill(null);//this will create a blank array to store our moves

let winningColor = getComputedStyle(document.body).getPropertyValue('--winningColor');







//setting up the board as an array so we can store and access player moves.
let isGameActive = true;
let cells = Array.from(document.getElementsByClassName('cell'));

// console.log(cells);
// console.log(spaces);


//need to store the winning moves as array combinations
const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];






//add event listener to each cell
const startGame = () => {
    cells.forEach(box => box.addEventListener('click', cellClicked))
}








function cellClicked(click) {
    const id = click.target.id
    // console.log(click.target)
    //check to make sure the box hasn't already been filled
    if (!spaces[id]) {
        spaces[id] = currentPlayer;

        //change the inner text of cell being clicked to current player
        click.target.innerText = currentPlayer;
        //if current player is X, then change it to O for next turn, or esle change to X.

        if (playerWins() !== false) {
            let winningBlocks = playerWins()
            //append a message to display winner
            playerWinBanner.append(`${currentPlayer} wins!`);
            //add a background color to show winning combo
            winningBlocks.map(cell => cells[cell].style.backgroundColor = winningColor);
            return;
        } else if (playerWins() == false && spaces.every(element => element !== null)) {
            playerWinBanner.append(`Tie Game. Play again.`);
        }

        currentPlayer = currentPlayer == X ? O : X

    }
}




function playerWins() {
    for (let condition of winningMoves) {
        let [a, b, c] = condition
        //loop through winning moves array to check to see if any of player's moves match winning moves
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    //if the loop doesnt return a winning combo, then return false (nobody wins)
    return false;

}





//when reset button is clicked, clear cells
resetButton.addEventListener('click', restart);

//function to return all cells to empty, or null, and remove winning style
function restart() {
    spaces.fill(null);
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '';
        playerWinBanner.remove();
    })



    currentPlayer = X;
}



startGame();





















// function handleResultValidation() {
//     let roundWon = false;
//     for (let i = 0; i <= 7; i++) {
//         const winCondition = winningMoves[i];
//         const a = board[winCondition[0]];
//         const b = board[winCondition[1]];
//         const c = board[winCondition[2]];
//         if (a === '' || b === '' || c === '') {
//             roundWon = true;
//             break;
//         }
//     }


//     if (roundWon) {
//         announce(currentPlayer === 'x' ? playerXwin : playerOwin);
//         isGameActive = false;
//         return;
//     }


//     if (!board.includes('')){
//     announce(tieGame);
//     }
// }


//     //diplay message depending on who wins
//     const announceWin = (type) => {
//         if(playerXwin){
//             announce.innerHTML = 'Player X Wins';
//         }else if(playerOwin){
//             announce.innerHTML = 'Player O Wins';
//         } else{
//             announce.innerHTML = 'Tie Game. Play again';
//         }
//         announce.classList.remove('hide');
//     }

//     const updateBoard = (index) => {
//         board[index] = currentPlayer;
//     }

// //make sure players only can play empty cells
//     const isValidAction = (cell) => {
//         if (cell.innerText === 'X' || cell.innerText === 'O'){
//             return false;
//         }
//     }

// // switch between players 
//     const nextPlayer = () => {
//         playerDisplay.classList.remove(`player${currentPlayer}`);
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         playerDisplay.innerText = currentPlayer;
//         playerDisplay.classlist.add(`player${currentPlayer}`);
//     }

//     //analyze board and determine if a move can be made. Then switch to next player.
//     const move = (cell, index) => {
//         if(isValidAction(cell) && isGameActive) {
//             cell.innerText = currentPlayer;
//             cell.classList.add(`player${currentPlayer}`);
//             updateBoard(index);
//             validateResult();
//             nextPlayer();
//         }
//     };


//     const resetBoard = () => {
//         board = ['', '', '', '', '', '', '', ''];
//         isGameActive = true;
//         announce.classList.add('hide');

//         if (currentPlayer === 'O') {
//             nextPlayer()
//         }

//         tiles.forEach(cell => {
//             cell.innerText = '';
//             cell.classList.remove('playerX');
//             cell.classList.remove('playerO');
//         });
//     }



//     reset.addEventListener('click', resetBoard);
//     cell.addEventListener('click', move);



// });