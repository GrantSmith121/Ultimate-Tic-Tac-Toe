// const space00 = document.getElementById("0-0");
// const space01 = document.getElementById("0-1");
// const space02 = document.getElementById("0-2");
// const space10 = document.getElementById("1-0");
// const space11 = document.getElementById("1-1");
// const space12 = document.getElementById("1-2");
// const space20 = document.getElementById("2-0");
// const space21 = document.getElementById("2-1");
// const space22 = document.getElementById("2-2");

const gridElement = document.getElementById("grid");

// const anySpace = document.get


const board = {
    spaces: [[null, null, null], [null, null, null], [null, null, null]],
    turn: "player1"
}

let spacesBaseCase = [[null, null, null], [null, null, null], [null, null, null]];
let testSpaces = [["X", "X", "X"], [null, null, null], [null, null, null]];
let testSpaces1 = [["X", null, null], ["X", null, null], ["O", null, null]];
let testSpaces2 = [["X", null, null], [null, "X", null], [null, null, "X"]];
let testSpaces3 = [[null, null, "X"], [null, "X", null], ["X", null, null]];

// 0=continue 1=win 2=lose
let winCondition = 0;

let yourTurn;

// location is an array
// the first is row coordinate and the second value is column coordinate
//location[2, 1]

// function to place either X or O in a specific space
function place(grid, location, mark) {

    let rowNum = location[0];
    let columnNum = location[1];

    let row = grid[rowNum];

    row[columnNum] = mark;
    console.log(row[columnNum]);
    console.log("space" + rowNum + columnNum);

}

gridElement.addEventListener('click', function(event) {
    if (event.target.classList.contains('space')) {
        console.log("Clicked on " + event.target.getAttribute('id'));

        const location = [Number((event.target.getAttribute('id')).substr(0, 1)), Number((event.target.getAttribute('id')).substr(1, 2))];
        console.log(location);
        place(board.spaces, location, "O");
        const space = document.getElementById(event.target.getAttribute('id'));
        space.innerText = "O";
    }
});


// space00.addEventListener('click', function() {
//     place(board.spaces, [0, 0], "O");
//     space00.innerText = "O";
// });



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




// function winCheck(spaces) {
//     for(let i = 0; i <= 2; i++) {
//         if (spaces[i])
//     };
// }