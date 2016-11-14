import styles from '../styles/index.css';

import Store from './Store.js';

const store = new Store();

// Inform the store of the player's intention to move if they click a cell.
const cells = document.querySelectorAll("td");
cells.forEach((el, ind, arr) => {
    const row = Math.floor(ind / 3);
    const col = ind % 3;
    el.addEventListener("click", e => {
        store.move(true, row, col);
    });
});

document.getElementById("resetButton").addEventListener("click", e => {
    store.reset();
});

// Rerender on store changes.
store.subscribe("move", () => {
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            const cell = cells[i * 3 + j];
            // TODO(mike): We'll probably want to use classes instead.
            switch (store.board.state[i][j]){
                case true:
                    cell.textContent = "O";
                    break;
                case false:
                    cell.textContent = "X";
                    break;
                case undefined:
                    cell.textContent = "";
                    break;
            }
        }
    }
});

store.subscribe("complete", () => {
    console.log(`won by ${store.board.winner}`)
});
