import styles from '../styles/index.css';

import Alphy from './Alphy.js';
import Store from './Store.js';

const store = new Store();
const alphy = new Alphy({
    store,
    chatEl: document.getElementById('chat'),
    alphyEl: document.getElementById('alphy')
});

// Inform the store of the player's intention to move if they click a cell.
const cells = document.querySelectorAll("#board .cell");
cells.forEach((el, ind, arr) => {
    const row = Math.floor(ind / 3);
    const col = ind % 3;
    el.addEventListener("click", e => {
        store.move(true, row, col);
    });
});

// Listen to buttons and toggles.
document.getElementById("hardModeInput").addEventListener("change", e => {
    store.setHardMode(e.target.checked);
});
document.getElementById("computerFirstInput").addEventListener("change", e => {
    store.setComputerFirst(e.target.checked);
});
document.getElementById("resetButton").addEventListener("click", e => {
    store.reset();
});

// Rerender on store changes.
store.subscribe("move", () => {
    // TODO(mike): When the game is over, add a class to to prevent the cursor
    // from being a pointer.
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            const cell = cells[i * 3 + j];
            switch (store.board.state[i][j]){
                case true:
                    cell.className = "cell o";
                    break;
                case false:
                    cell.className = "cell x";
                    break;
                case undefined:
                    cell.className = "cell";
                    break;
            }
        }
    }
});
