import Board from './Board.js';
import RandomPlayer from './Players/RandomPlayer.js';

class Store {
    constructor(){
        // TODO(mike): Consider a convention for private variables.
        // TODO(mike): Consider adding argument to rehydrate from saved state.
        // TODO(mike): Consider putting all state variables under this.state.
        this.board = new Board();
        this.player = new RandomPlayer();

        this.humanTurn = true;

        this.callbacks = {};
    }

    move(player, row, column){
        // TODO(mike): Handle illegal moves.
        if (this.board.winner !== undefined ||
                !this.board.isLegalMove(row, column)){
            return;
        }

        this.board = this.board.move(player, row, column);
        this.publish("move");
        this.humanTurn = !this.humanTurn;

        if (this.board.winner !== undefined){
            this.publish("complete");
        } else if (!this.humanTurn){
            const nextMove = this.player.move(this.board);
            this.move(false, nextMove.row, nextMove.column);
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
