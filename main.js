const gridElement = document.getElementById("grid");
const playButton = document.getElementById("play-button");

const indexValues = ["00-00","00-02","00-01","00-10","00-11","00-12","00-20","00-21","00-22","01-00","01-01","01-02","01-10","01-11","01-12","01-20","01-21","01-22","02-00","02-01","02-02","02-10","02-11","02-12","02-20","02-21","02-22","10-00","10-01","10-02","10-10","10-11","10-12","10-20","10-21","10-22","11-00","11-01","11-02","11-10","11-11","11-12","11-20","11-21","11-22","12-00","12-01","12-02","12-10","12-11","12-12","12-20","12-21","12-22","20-00","20-01","20-02","20-10","20-11","20-12","20-20","20-21","20-22","21-00","21-01","21-02","21-10","21-11","21-12","21-20","21-21","21-22","22-00","22-01","22-02","22-10","22-11","22-12","22-20","22-21","22-22"]

const miniGrid = [[null, null, null], [null, null, null], [null, null, null]];
const largeGrid = [[miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid]];

const board = {
    spaces: [[miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid]],
    turn: 1,
    winner: "",
    gameActive: false
}

let spacesBaseCase = [[null, null, null], [null, null, null], [null, null, null]];
let testSpaces = [["X", "X", "X"], [null, null, null], [null, null, null]];
let testSpaces1 = [["X", null, null], ["X", null, null], ["O", null, null]];
let testSpaces2 = [["X", null, null], [null, "X", null], [null, null, "X"]];
let testSpaces3 = [[null, null, "X"], [null, "X", null], ["X", null, null]];
let newSpaceBaseCase = [[[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]];

// 0=continue 1=win 2=lose
let winCondition = 0;

function toggleAllSpaces() {
    for (let i = 0; i < indexValues.length; i++ ){
        let space = document.getElementById(indexValues[i]);
        if (space.innerText === "") {
            space.classList.toggle('hover-effect');
        }
    }
}

toggleAllSpaces();

function emptyAllSpaces() {
    for (let i = 0; i < indexValues.length; i++ ){
        let space = document.getElementById(indexValues[i]);
        space.innerText = "";
    }
}

playButton.addEventListener("click", function() {
    // console.log(playButton.style.display);
    playButton.style.display = "none";
    board.gameActive = true;
    board.spaces = [[null, null, null], [null, null, null], [null, null, null]];
    board.turn = 1;
    board.winner = "";
    emptyAllSpaces();
    toggleAllSpaces();
})

// location is an array
// the first is row coordinate and the second value is column coordinate
//location[2, 1]

// function to place either X or O in a specific space
function place(grid, location, mark) {

    if (grid.winner != "") {
        console.log(mark + " wins!");
        return;
    }

    if (grid.gameActive === false) {
        return;
    }

    let rowNum = location[0];
    let columnNum = location[1];

    let row = grid.spaces[rowNum];

    row[columnNum] = mark;
    console.log(row[columnNum]);
    console.log("space" + rowNum + columnNum);

    winCheck(grid, mark);



    if (grid.turn === 1) {
        grid.turn = 2;
        aiPlay();
    } else { grid.turn = 1 }

    //let indexValues = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    // return true;
    if (grid.winner != "") {
        console.log(grid.winner + " wins!");
        let space = document.getElementById("" + location[0] + location[1]);
        space.classList.toggle('hover-effect');
        
        toggleAllSpaces();
    }
    return true;
}

gridElement.addEventListener('click', function(event) {
    if (event.target.classList.contains('space') && board.turn === 1 && board.gameActive === true) {
         const space = document.getElementById(event.target.getAttribute('id'));
        if (space.innerText === "" && board.winner === "") {
            const location = [Number((event.target.getAttribute('id')).substr(0, 1)), Number((event.target.getAttribute('id')).substr(1, 2))];
            place(board, location, "O");
            space.innerText = "O";
            space.classList.toggle('hover-effect');
        }
    }
});

function rowCheck(row) {
    if (row[0] === null || row[1] === null || row[2] === null) {
        return false;
    }
    if (row[0] != row[1]) {
        return false;
    }
    else if (row[1] != row[2]) {
        return false;
    }
    else return true;
}

// grid is the set of all given spaces and index is which column you want to check
function columnCheck(grid, index) {
    if ((grid[0])[index] === null || (grid[0])[index] === null || (grid[0])[index] === null) {
        return false;
    }

    if ((grid[0])[index] != (grid[1])[index]) {
        return false;
    }
    else if ((grid[1])[index] != (grid[2])[index]) {
        return false;
    }
    else return true;
}

// leftToRight is a boolean to check if you are going diagonal from left to right or right to left
function diagonalCheck(grid) {
    if ((grid[1])[1] === null || ((grid[0])[0] === null && (grid[0])[2] === null) || ((grid[2])[0] === null && (grid[2])[2] === null)) {
        return false;
    }
    if (((grid[0])[0] === null && (grid[2])[0] === null) || ((grid[0])[2] === null && (grid[2])[2] === null)) {
        return false;
    }
    if(((grid[1])[1] != (grid[0])[0]) && ((grid[1])[1] != (grid[0])[2])) {
        return false;
    }
    if (((grid[1])[1] != (grid[2])[0]) && ((grid[1])[1] != (grid[2])[2])) {
        return false;
    }
    if (((grid[1])[1] != (grid[0])[0]) && ((grid[1])[1] != (grid[2])[0])) {
        return false;
    }
    if (((grid[1])[1] != (grid[0])[2]) && ((grid[1])[1] != (grid[2])[2])) {
        return false;
    }
    else return true;

}




// player is either "X" or "O"
function winCheck(grid, player) {
    for(let i = 0; i <= 2; i++) {
        rowCheck(grid.spaces[i]);
        if (rowCheck(grid.spaces[i])) {
            grid.winner = player;
            playButton.style.display = "block";
            playButton.textContent = "" + board.winner + " wins! Play again?";
            // console.log("Player 1 wins!");
            return;
        }
        columnCheck(grid.spaces, i);
        if (columnCheck(grid.spaces, i)) {
            grid.winner = player;
            playButton.style.display = "block";
            playButton.textContent = "" + board.winner + " wins! Play again?";
            // console.log("Player 1 wins!");
            return;
        }
    };
    diagonalCheck(grid.spaces);
    if (diagonalCheck(grid.spaces)) {
        grid.winner = player;
        playButton.style.display = "block";
        playButton.textContent = "" + board.winner + " wins! Play again?";
        // console.log("Player 1 wins!");
        return;
    };
}

function anySpacesEmpty() {

    for (let i = 0; i <= 2; i++) {
        if (board.spaces[i][0] === null) {
            return true;
        }
        if (board.spaces[i][1] === null) {
            return true;
        }
        if (board.spaces[i][2] === null) {
            return true;
        }
    } return false;
}

function aiPlay() {
    if (board.winner != "") {
        return;
    }

    let location = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
    // the function found an empty space

    if (anySpacesEmpty()) {
        if (board.spaces[location[0]][location[1]] === null) {
            setTimeout(() => {  
                place(board, location, "X");
                const space = document.getElementById("" + location[0].toString() + location[1].toString());
                space.innerText = "X";
                space.classList.toggle('hover-effect'); 
            }, 1000);
    
            return;
        // the function found a space already filled
         } else { 
            location = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]; 
            aiPlay();
        }
    } else {
        board.winner = "No one";
        playButton.style.display = "block";
        playButton.textContent = "" + board.winner + " wins! Play again?";
        return;
    }
    
}
