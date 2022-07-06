let xOrOCounter = 0;
let tiles = document.querySelectorAll('.tile');
tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if(tile.children[0].innerText === '-') {
            tile.children[0].innerText = xOrOCounter % 2 === 0 ? "X" : "O";
            xOrOCounter++;
        }
        checkForWin(tiles)
    })
})

function checkForWin(tiles) {
    //create 2d array 
    let tiles2D = convertTilesTo2DArray(tiles);
    //console.log(tiles2D);

    //checks for rows
    for(let i = 0; i < 3; i++) {
        if(tiles2D[i].every(tile => tile === tiles2D[i][0] && tile !== '-')) {
            console.log(`${tiles2D[i][0]}'s win!`)
            return;
        }
    }
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