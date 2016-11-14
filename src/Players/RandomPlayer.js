import Player from './Player.js';
import * as Utilities from '../Utilities.js';

class RandomPlayer extends Player {
    constructor(){
        super();
    }

    // TODO(mike): It might be helpful to make a Move class.
    move(board){
        // Choose a move randomly from the possible options.
        return Utilities.pick(board.getLegalMoves());
    }
}

export default RandomPlayer;
