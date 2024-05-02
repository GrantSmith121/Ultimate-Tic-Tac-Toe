let spaces = [[null, null, null], [null, null, null], [null, null, null]];
let testSpaces = [["X", "X", "X"], [null, null, null], [null, null, null]];
let testSpaces1 = [["X", null, null], ["X", null, null], ["O", null, null]];
let testSpaces2 = [["X", null, null], [null, "X", null], [null, null, "X"]];

// 0=continue 1=win 2=lose
let winCondition = 0;

let yourTurn;

// location is an array
// the first is row coordinate and the second value is column coordinate
//location[2, 1]

// function to place either X or O in a specific space
function place(location, mark) {

    //let rowNum = grid[rowPOS]; // val = grid[2] = row2 = [0, 0, 0]
    //let column = rowNum[columnPOS]; // val = 0

    let row = location[0];
    let column = location[1];

    let rowInColumn = row[column];

    //spaces[(location[0])[(location[1])]];
    console.log(spaces[rowInColumn]);

    column = mark;
}



function rowCheck(row) {
    if (row[0] === null || row[1] === null || row[2] === null) {
        // return false;
        // console.log("nope");
        return false;
    }
    // else return rowChecker(row);
    // console.log(rowChecker(row));
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
function diagonalCheck(grid, leftToRight) {
    // if ((grid[0])[0] === null || (grid[1])[1] === null || (grid[2])[2] === null || (grid[0])[2] === null || (grid[2])[0] === null) {
    //     return false;
    // }
    // condition for if we are checking from left to right
    if (leftToRight == true) {
        if ((grid[0])[0] === null || (grid[1])[1] === null || (grid[2])[2] === null) {
            return false;
        }
        if ((grid[0])[0] != (grid[1])[1]) {
            return false;
        }
        else if ((grid[1])[1] != (grid[2])[2]) {
            return false;
        }
        else return true;
    }
    // condition for if we are checking from right to left
    else {
        if ((grid[0])[2] === null || (grid[1])[1] === null || (grid[2])[0] === null) {
            return false;
        }
        if ((grid[0])[2] != (grid[1])[1]) {
            return false;
        }
        else if ((grid[1])[1] != (grid[2])[0]) {
            return false;
        }
        else return true;
    }



}

// function winCheck(spaces) {
//     for(let i = 0; i <= 2; i++) {
//         if (spaces[i])
//     };
// }