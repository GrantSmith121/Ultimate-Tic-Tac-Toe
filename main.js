const gridElement = document.getElementById("grid");
const playButton = document.getElementById("play-button");

const indexValues = ["00-00","00-02","00-01","00-10","00-11","00-12","00-20","00-21","00-22","01-00","01-01","01-02","01-10","01-11","01-12","01-20","01-21","01-22","02-00","02-01","02-02","02-10","02-11","02-12","02-20","02-21","02-22","10-00","10-01","10-02","10-10","10-11","10-12","10-20","10-21","10-22","11-00","11-01","11-02","11-10","11-11","11-12","11-20","11-21","11-22","12-00","12-01","12-02","12-10","12-11","12-12","12-20","12-21","12-22","20-00","20-01","20-02","20-10","20-11","20-12","20-20","20-21","20-22","21-00","21-01","21-02","21-10","21-11","21-12","21-20","21-21","21-22","22-00","22-01","22-02","22-10","22-11","22-12","22-20","22-21","22-22"]

// Function to create a new miniGrid
function createMiniGrid() {
    return [[null, null, null], [null, null, null], [null, null, null]];
}

// Function to create a new largeGrid
function createLargeGrid() {
    return [[createMiniGrid(), createMiniGrid(), createMiniGrid()], [createMiniGrid(), createMiniGrid(), createMiniGrid()],[createMiniGrid(), createMiniGrid(), createMiniGrid()]];
}

const board = {
    spaces: createLargeGrid(),
    turn: 1,
    winner: "",
    gameActive: false,
    activeGrid: null
}

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
    playButton.style.display = "none";
    board.gameActive = true;
    board.spaces = createLargeGrid();
    board.turn = 1;
    board.winner = "";
    board.activeGrid = null;
    emptyAllSpaces();
    toggleAllSpaces();
})

// function to place either X or O in a specific space
function place(grid, location, mark) {
    if (board.winner !== "") {
        console.log(mark + " wins!");
        return;
    }

    if (board.gameActive === false) {
        return;
    }

    let bigGridRowNum = Number(board.activeGrid.substr(0, 1));
    let bigGridColumnNum = Number(board.activeGrid.substr(1, 1));

    let miniGrid = board.spaces[bigGridRowNum][bigGridColumnNum];

    let rowNum = location[0];
    let columnNum = location[1];

    miniGrid[rowNum][columnNum] = mark;
    console.log(miniGrid[rowNum][columnNum]);
    console.log("space" + rowNum + columnNum);

    winCheck(miniGrid, mark);

    // board.activeGrid = "" + location[0] + location [1];

    if (board.turn === 1) {
        board.turn = 2;
        aiPlay();
    } else {
        board.turn = 1;
    }

    // board.activeGrid = "" + location[0] + location[1];

    if (board.winner !== "") {
        console.log(board.winner + " wins!");
        let space = document.getElementById("" + location[0] + location[1]);
        space.classList.toggle('hover-effect');
        
        toggleAllSpaces();
    }
    
    setTimeout(() => {  
        board.activeGrid = "" + location[0] + location[1];
    }, 1);
    

    return true;
}

gridElement.addEventListener('click', function(event) {
    if (event.target.classList.contains('space') && board.turn === 1 && board.gameActive === true) {
        const space = document.getElementById(event.target.getAttribute('id'));
        if (space.innerText === "" && board.winner === "") {
            const location = [Number(event.target.getAttribute('id').substr(3, 1)), Number(event.target.getAttribute('id').substr(4, 1))];
            if (board.activeGrid === null) {
                board.activeGrid = event.target.getAttribute('id').substr(3, 2);                
                place(board.activeGrid, location, "O");
                space.innerText = "O";
                space.classList.toggle('hover-effect');
            } else {
                if ((event.target.getAttribute("id").substr(0, 1) + event.target.getAttribute("id").substr(1, 1)) === (board.activeGrid.substr(0,1) + board.activeGrid.substr(1, 1))) {
                    place(board.activeGrid, location, "O");
                    space.innerText = "O";
                    space.classList.toggle('hover-effect');
                } 
            }
            
        }
    }
});

function isString(variable) {
    return (typeof variable === "string" || variable instanceof String);
}

function rowCheck(row) {
    if (!isString(row[0]) || !isString(row[1]) || !isString(row[2])) {
        return false;
    }
    return row[0] === row[1] && row[1] === row[2];
}

// grid is the set of all given spaces and index is which column you want to check
function columnCheck(grid, index) {
    if (!isString(grid[0][index]) || !isString(grid[1][index]) || !isString(grid[2][index])) {
        return false;
    }
    return grid[0][index] === grid[1][index] && grid[1][index] === grid[2][index];
}

function diagonalCheck(grid) {
    if (!isString(grid[1][1]) || (!isString(grid[0][0]) && !isString(grid[0][2])) || (!isString(grid[2][0]) && !isString(grid[2][2]))) {
        return false;
    }
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        return true;
    }
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        return true;
    }
    return false;
}

// player is either "X" or "O"
function winCheck(grid, player) {
    for (let i = 0; i <= 2; i++) {
        if (rowCheck(grid[i]) || columnCheck(grid, i)) {
            board.winner = player;
            playButton.style.display = "block";
            playButton.textContent = `${board.winner} wins! Play again?`;
            return;
        }
    }
    if (diagonalCheck(grid)) {
        board.winner = player;
        playButton.style.display = "block";
        playButton.textContent = `${board.winner} wins! Play again?`;
    }
}

function anySpacesEmpty(grid) {
    for (let i = 0; i <= 2; i++) {
        if (grid[i][0] === null || grid[i][1] === null || grid[i][2] === null) {
            return true;
        }
    }
    return false;
}

function aiPlay() {
    if (board.winner !== "") {
        return;
    }

    let location = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
    let miniGrid = board.spaces[Number(board.activeGrid[0])][Number(board.activeGrid[1])];

    if (anySpacesEmpty(miniGrid)) {
        console.log("spaces empty");
        console.log(location[0] + " " + location[1] + " " + miniGrid[location[0]][location[1]]);
        if (miniGrid[location[0]][location[1]] === null) {
            setTimeout(() => {  
                place(board.activeGrid, location, "X");
                const space = document.getElementById("" + board.activeGrid.substr(0, 1) + board.activeGrid.substr(1, 1) + "-" + location[0] + location[1]);
                space.innerText = "X";
                space.classList.toggle('hover-effect'); 
            }, 1000);
            return;
        } else { aiPlay(); }
    }
}