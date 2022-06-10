let xOrOCounter = 0;
let tiles = document.querySelectorAll('.tile');
tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        tile.children[0].innerText = xOrOCounter % 2 === 0 ? "X" : "O";
        xOrOCounter++;
    })
})

