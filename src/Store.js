import Board from './Board.js';

class Store {
    constructor(){
        // TODO(mike): Consider a convention for private variables.
        // TODO(mike): Consider adding argument to rehydrate from saved state.
        // TODO(mike): Consider putting all state variables under this.state.
        this.board = new Board();

        this.callbacks = [];
    }

    move(...args){
        // TODO(mike): Handle illegal moves.
        this.board = this.board.move(...args);
        this.publish();
    }

    subscribe(callback){
        // TODO(mike): Allow for unsubscribe?
        this.callbacks.push(callback);
    }

    publish(){
        this.callbacks.forEach(callback => callback.call())
    }
}

export default Store;
