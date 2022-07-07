document.querySelector('#resetBtn').addEventListener('click', resetBoard);

let xOrOCounter = 0;
let tiles = document.querySelectorAll('.tile');
let boardState = document.querySelector('#boardState');
let gameOver = false;
tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if(tile.children[0].innerText === '-' && !gameOver) {
            tile.children[0].innerText = xOrOCounter % 2 === 0 ? "X" : "O";
            boardState.innerText = `${xOrOCounter % 2 !== 0 ? "X" : "O"}'s turn`;
            xOrOCounter++;
        }

        gameOver = checkForWin(tiles)
    })
})

function checkForWin(tiles) {
    //create 2d array 
    let tiles2D = convertTilesTo2DArray(tiles);
    let tiles2DCols = getColumnsFrom2DArray(tiles2D);
    let isWin = true;

    // checks each element in the array inside the 2D array to see if they are same value
    const winCheck = (arr, i) => { 
        return arr[i].every(tile => tile === arr[i][0] && tile !== '-') 
    } 

    // checks columns and rows for wins
    for(let i = 0; i < 3; i++) {
        if(winCheck(tiles2D, i)) { // checks rows
            boardState.innerText = `${tiles2D[i][0]}'s win!`;
            return isWin;
        }
        else if(winCheck(tiles2DCols, i)){ // checks columns
            boardState.innerText = `${tiles2D[i][0]}'s win!`;
            return isWin;
        }
    }

    // checks to see if diagonal win is possible
    if(tiles2D[1][1] !== '-') { 
        if(tiles2D[0][0] === tiles2D[1][1] && tiles2D[1][1] === tiles2D[2][2]) { // checks tl mm br
            boardState.innerText = `${tiles2D[0][0]}'s win!`;
            return isWin;
        }
        else if(tiles2D[0][2] === tiles2D[1][1] && tiles2D[1][1] === tiles2D[2][0]) { // checks tr mm bl
            boardState.innerText = `${tiles2D[0][2]}'s win!`;
            return isWin;
        }
    }

    return !isWin;
}

function getColumnsFrom2DArray(tiles) {
    const getCol = i => { 
        return tiles.map(row => { return row[i] })
    };

    return [getCol(0),getCol(1),getCol(2)]
}

function convertTilesTo2DArray(tiles) {
    let board = Array.from(tiles).map(tile => tile.innerText);
    let tiles2D = [];
    let inc = 0;

    for(let i = 0; i < 3; i++) {
        let row = [];
        for(let j = inc; j < inc + 3; j++) {
            row.push(board[j]);
        }
        tiles2D.push(row);
        inc += 3;
    }
    
    return tiles2D;
}

function resetBoard() {
    boardState.innerText = 'X\'s turn';
    gameOver = false;
    xOrOCounter = 0;
    tiles.forEach(tile => {
        tile.innerHTML = '<span>-</span>';
    });
}