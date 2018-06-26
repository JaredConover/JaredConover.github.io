"use strict";
let response;
let grid = [
    [1,0,1,1,0],
    [1,0,0,0,0],
    [1,0,1,1,1],
    [1,1,0,0,0],
    [0,1,0,0,0]
];

function fireOn(x,y){
    if (grid[x][y] === 1){
        response = "HIT!!";
    } else {
        response = "miss";
    }
    return response;
}

console.log("Welcome to Battleship");
console.log("enter coordinates: x, y");



