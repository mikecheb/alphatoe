import Board from './Board.js';
import GosuPlayer from './Players/GosuPlayer.js';
import RandomPlayer from './Players/RandomPlayer.js';

class Store {
    constructor(){
        // TODO(mike): Consider a convention for private variables.
        // TODO(mike): Consider adding argument to rehydrate from saved state.
        // TODO(mike): Consider putting all state variables under this.state.
        this.board = new Board();

        this.hardMode = false;
        this.player = new RandomPlayer();

        this.computerFirst = false;
        this.humanTurn = true;

        this.callbacks = {};
    }

    setHardMode(value){
        this.hardMode = value;
        if (this.hardMode){
            this.player = new GosuPlayer();
        } else {
            this.player = new RandomPlayer();
        }
    }

    // TODO(mike): Consider warning the player before a the reset.
    setComputerFirst(value){
        this.computerFirst = value;
        this.reset();
    }

    move(player, row, column){
        // Prevent a move if the game is over, the cell is already occupied, or
        // it's not this player's turn.
        if (this.board.winner !== undefined ||
                !this.board.isLegalMove(row, column) ||
                player !== this.humanTurn){
            return;
        }

        this.board = this.board.move(player, row, column);
        this.publish("move");
        this.humanTurn = !this.humanTurn;

        if (this.board.winner !== undefined){
            this.publish("complete");
        } else if (!this.humanTurn){
            this.moveAI();
        }
    }

    // TODO(mike): Come up with a better name for this.
    moveAI(){
        const nextMove = this.player.move(this.board);
        this.move(false, nextMove.row, nextMove.column);
    }

    reset(){
        this.board = new Board();
        this.humanTurn = !this.computerFirst;
        if (this.computerFirst){
            this.moveAI();
        } else {
            this.publish("move");
        }
    }

    subscribe(eventName, callback){
        // TODO(mike): Allow for unsubscribe.
        if (!this.callbacks[eventName]){
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    publish(eventName){
        if (this.callbacks[eventName]){
            this.callbacks[eventName].forEach(callback => callback.call());
        }
    }
}

export default Store;
