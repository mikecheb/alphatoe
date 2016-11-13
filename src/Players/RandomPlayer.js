import Player from './Player.js';

class RandomPlayer extends Player {
    constructor(){
        super();
    }

    // TODO(mike): It might be helpful to make a Move class.
    move(board){
        // Make a list of every possible move.
        const moves = [];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (board.isLegalMove(i, j)){
                    moves.push({
                        row: i,
                        column: j
                    });
                }
            }
        }

        // Choose a move randomly.
        return moves[Math.floor(Math.random() * moves.length)];
    }
}

export default RandomPlayer;
