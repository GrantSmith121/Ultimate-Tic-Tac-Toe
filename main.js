const gridElement = document.getElementById("grid");
const playButton = document.getElementById("play-button");

const indexValues = ["00-00","00-02","00-01","00-10","00-11","00-12","00-20","00-21","00-22","01-00","01-01","01-02","01-10","01-11","01-12","01-20","01-21","01-22","02-00","02-01","02-02","02-10","02-11","02-12","02-20","02-21","02-22","10-00","10-01","10-02","10-10","10-11","10-12","10-20","10-21","10-22","11-00","11-01","11-02","11-10","11-11","11-12","11-20","11-21","11-22","12-00","12-01","12-02","12-10","12-11","12-12","12-20","12-21","12-22","20-00","20-01","20-02","20-10","20-11","20-12","20-20","20-21","20-22","21-00","21-01","21-02","21-10","21-11","21-12","21-20","21-21","21-22","22-00","22-01","22-02","22-10","22-11","22-12","22-20","22-21","22-22"]

const miniGrid = [[null, null, null], [null, null, null], [null, null, null]];
const largeGrid = [[miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid]];

const board = {
    spaces: [[miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid]],
    turn: 1,
    winner: "",
    gameActive: false,
    activeGrid: null
}

let spacesBaseCase = [[null, null, null], [null, null, null], [null, null, null]];
let testSpaces = [["X", "X", "X"], [null, null, null], [null, null, null]];
let testSpaces1 = [["X", null, null], ["X", null, null], ["O", null, null]];
let testSpaces2 = [["X", null, null], [null, "X", null], [null, null, "X"]];
let testSpaces3 = [[null, null, "X"], [null, "X", null], ["X", null, null]];
let newSpaceBaseCase = [[[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]];
let newTestSpaces1 = [["X", miniGrid, miniGrid], [miniGrid, "X", miniGrid], [miniGrid, miniGrid, "X"]];
let newTestSpaces2 = [["X", miniGrid, miniGrid], ["X", miniGrid, miniGrid], ["X", miniGrid, miniGrid]];
let newTestSpaces3 = [["X", "X", "X"], [miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid]];
let newTestSpaces4 = [[[["X", "X", "X"], [null, null, null], [null, null, null]], miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid], [miniGrid, miniGrid, miniGrid]];

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
    board.spaces = largeGrid;
    board.turn = 1;
    board.winner = "";
    board.activeGrid = null;
    emptyAllSpaces();
    toggleAllSpaces();
})

// location is an array
// the first is row coordinate and the second value is column coordinate
//location[2, 1]

// function to place either X or O in a specific space
function place(grid, location, mark) {

    if (board.winner != "") {
        console.log(mark + " wins!");
        return;
    }

    if (board.gameActive === false) {
        return;
    }

    let bigGridRowNum = Number(board.activeGrid.substr(0, 1));
    let bigGridColumnNum = Number(board.activeGrid.substr(1, 1));

    let bigGridRow = board.spaces[bigGridRowNum];
    let bigGridColumn = bigGridRow[bigGridColumnNum];


    let rowNum = location[0];
    let columnNum = location[1];

    let row = bigGridColumn[rowNum];

    row[columnNum] = mark;
    console.log(row[columnNum]);
    console.log("space" + rowNum + columnNum);

    winCheck(grid, mark);



    if (board.turn === 1) {
        board.turn = 2;
        aiPlay();
    } else { board.turn = 1 }

    if (board.winner != "") {
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
         console.log(space);
        if (space.innerText === "" && board.winner === "") {
            const location = [Number((event.target.getAttribute('id')).substr(3, 4)), Number((event.target.getAttribute('id')).substr(4, 5))];
            if (board.activeGrid === null) {
                // const tempActiveGrid = [Number(event.target.getAttribute('id').substr(0, 1)) + " " + Number(event.target.getAttribute('id').substr(1, 1))];
                board.activeGrid = event.target.getAttribute('id').substr(0, 1) + "" + event.target.getAttribute('id').substr(1, 1);                
                place(board, location, "O");
            }
            space.innerText = "O";
            space.classList.toggle('hover-effect');
        }
    }
});

function isString(variable) {
    if (typeof variable === "string" || variable instanceof String) {
        return true;
    } else return false;
}

function rowCheck(row) {
    if (isString(row[0]) === false || isString(row[1]) === false || isString(row[2]) === false) {
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
    if (isString((grid[0])[index]) === false || isString((grid[0])[index]) === false || isString((grid[0])[index]) === false) {
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

function diagonalCheck(grid) {
    if (isString((grid[1])[1]) === false || (isString((grid[0])[0]) === false && isString((grid[0])[2]) === false) || (isString((grid[2])[0]) === false && isString((grid[2])[2]) === false)) {
        return false;
    }
    if ((isString((grid[0])[0]) === false && isString((grid[2])[0]) === false) || (isString((grid[0])[2]) === false && isString((grid[2])[2]) === false)) {
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
        rowCheck(grid[i]);
        if (rowCheck(grid[i])) {
            if (grid === board.spaces) {
                board.winner = player;
                playButton.style.display = "block";
                playButton.textContent = "" + board.winner + " wins! Play again?";
                return;
            } else {
                winCheck(board.spaces, player);
            }
            // grid.winner = player;
            // playButton.style.display = "block";
            // playButton.textContent = "" + board.winner + " wins! Play again?";
        }
        columnCheck(grid, i);
        if (columnCheck(grid, i)) {
            if (grid === board.spaces) {
                board.winner = player;
                playButton.style.display = "block";
                playButton.textContent = "" + board.winner + " wins! Play again?";
                return;
            } else {
                winCheck(board.spaces, player);
            }
            // grid.winner = player;
            // playButton.style.display = "block";
            // playButton.textContent = "" + board.winner + " wins! Play again?";
        }
    };
    diagonalCheck(grid);
    if (diagonalCheck(grid)) {
        if (grid === board.spaces) {
            board.winner = player;
            playButton.style.display = "block";
            playButton.textContent = "" + board.winner + " wins! Play again?";
            return;
        } else {
            winCheck(board.spaces, player);
        }
        // grid.winner = player;
        // playButton.style.display = "block";
        // playButton.textContent = "" + board.winner + " wins! Play again?";
        
    };
}

function anySpacesEmpty(grid) {

    for (let i = 0; i <= 2; i++) {
        if (grid.spaces[i][0] === null) {
            return true;
        }
        if (grid.spaces[i][1] === null) {
            return true;
        }
        if (grid.spaces[i][2] === null) {
            return true;
        }
    } return false;
}

function aiPlay(grid) {
    if (board.winner != "") {
        return;
    }

    let location = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
    // the function found an empty space

    if (anySpacesEmpty(grid)) {
        if (grid.spaces[location[0]][location[1]] === null) {
            setTimeout(() => {  
                place(grid, location, "X");
                const space = document.getElementById("" + location[0].toString() + location[1].toString());
                space.innerText = "X";
                space.classList.toggle('hover-effect'); 
            }, 1000);
    
            return;
        // the function found a space already filled
         } else { 
            location = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]; 
            aiPlay(grid);
        }
    } else {
        board.winner = "No one";
        playButton.style.display = "block";
        playButton.textContent = "" + board.winner + " wins! Play again?";
        return;
    }
    
}
