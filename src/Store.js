import Board from './Board.js';
import GosuPlayer from './Players/GosuPlayer.js';
import RandomPlayer from './Players/RandomPlayer.js';

class Store {
    constructor(){
        // TODO(mike): Consider a convention for private variables.
        // TODO(mike): Consider adding argument to rehydrate from saved state.
        // TODO(mike): Consider putting all state variables under this.state.
        this.board = new Board();

        // Variables related to the current difficulty setting.
        this.hardMode = false;
        this.player = new RandomPlayer();

        // Variables related to the turn order.
        this.computerFirst = false;
        this.humanTurn = true;

        /**
         * A map of event types to callbacks (aka subscribers).
         *
         * This class fires the following events:
         * move: The board state was updated.
         * won: The board entered a terminal state (which could be a tie).
         */
        this.callbacks = {};
    }

    /**
     * Alters whether the computer plays intelligently or randomly.
     */
    // TODO(mike): Consider warning the player before a reset.
    setHardMode(value){
        this.hardMode = value;
        if (this.hardMode){
            this.player = new GosuPlayer();
        } else {
            this.player = new RandomPlayer();
        }
        this.publish("toggleDifficulty");
    }

    /**
     * Alters whether the human or the computer goes first.
     */
    setComputerFirst(value){
        this.computerFirst = value;
        this.reset();
    }

    /**
     * Advances the board state given a player's intention to move in a tile.
     */
    move(player, row, column){
        // Bail out if the game is over.
        if (this.board.winner !== undefined)
            return;

        // Bail out if the cell is already occupied.
        if (!this.board.isLegalMove(row, column))
            return;

        // Bail out if it's not this player's turn.
        if (player !== this.humanTurn)
            return;

        // Update the board state based on this move.
        this.board = this.board.move(player, row, column);
        this.humanTurn = !this.humanTurn;
        this.publish("move");

        // If this new board is complete, publish a win.
        if (this.board.winner !== undefined){
            this.publish("complete");
        } else if (!this.humanTurn){
            // Tell the AI to make a move, if it's now their turn.
            this.moveAI();
        }
    }

    /**
     * Get the AI's next move, and act on it.
     *
     * TODO(mike): I'm a little worried about how this gets called. If there's a
     * bug that causes the AI to try an illegal move, this won't get called
     * again and the game will become unplayable until reset.
     */
    moveAI(){
        const nextMove = this.player.move(this.board);
        this.move(false, nextMove.row, nextMove.column);
    }

    /**
     * Resets the game, clearing the board and taking a turn, if the AI goes
     * first.
     */
    reset(){
        this.board = new Board();
        this.humanTurn = !this.computerFirst;
        this.publish("move");
        this.publish("reset");

        // The AI takes a move if the user has allowed the computer to go first.
        if (this.computerFirst){
            this.moveAI();
        }
    }

    /**
     * Associates a callback with an event type, to be called when that event is
     * "fired".
     */
    subscribe(eventName, callback){
        if (!this.callbacks[eventName]){
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    /**
     * Calls every callback associated with this event type.
     */
    publish(eventName){
        if (this.callbacks[eventName]){
            this.callbacks[eventName].forEach(callback => callback.call());
        }
    }
}

export default Store;
