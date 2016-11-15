/**
 * TODO(mike): Let outsiders read the state only; give them a method to call
 * instead of letting them access it directly.
 */
class Board {
    constructor(state){
        // Right now, undefined means empty, true is the human player, and false
        // is the robot player.
        this.state = [new Array(3), new Array(3), new Array(3)];
        if (state){
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    this.state[i][j] = state[i][j];
                }
            }
        }

        this.moveCount = 0;
        this.winner = this.computeWinner();
    }

    /**
     * Returns a new board. The state of the new board is the state of the
     * current board plus the given move. Returning a new board is useful when
     * we're doing lookahead.
     */
    move(player, row, column){
        // TODO(mike): We currently assume valid input, relying on the caller
        // to check if a move is legitimate.
        // TODO(mike): We can spin out board iteration logic.
        const newState = [new Array(3), new Array(3), new Array(3)];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                newState[i][j] = this.state[i][j];
            }
        }
        newState[row][column] = player;
        return new Board(newState);
    }

    /**
     * Returns true if the given tile is occupied, or false otherwise.
     */
    isLegalMove(row, column){
        return this.state[row][column] === undefined;
    }

    /**
     * Returns every tile that isn't occupied.
     */
    getLegalMoves(){
        const moves = [];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (this.isLegalMove(i, j)){
                    moves.push({
                        row: i,
                        column: j
                    });
                }
            }
        }
        return moves;
    }

    /**
     * Right now, this returns undefined if the game is in progress, null if the
     * game is tied, true if the human won, and false if the computer won.
     * TODO(mike): Come up with better coding for this.
     */
    computeWinner(){
        // Store the sum of each row for quick win tallying.
        let winner;
        const rowTallies = [{sum: 0}, {sum: 0}, {sum: 0}];
        const colTallies = [{sum: 0}, {sum: 0}, {sum: 0}];
        const diaTallies = [{sum: 0}, {sum: 0}];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                const cellContent = this.state[i][j];
                if (cellContent === undefined)
                    continue;
                this.moveCount++;

                const cellTallies = [];
                cellTallies.push(rowTallies[i]);
                cellTallies.push(colTallies[j]);
                if (i === j){
                    cellTallies.push(diaTallies[0]);
                }
                if (i + j === 2){
                    cellTallies.push(diaTallies[1])
                }

                cellTallies.forEach(el => {
                    el.sum += cellContent ? 1 : -1;
                    if (el.sum === 3){
                        winner = true;
                    } else if (el.sum === -3){
                        winner = false;
                    }
                });
                if (winner !== undefined){
                    return winner;
                }
            }
        }

        // If we found no winner, the game is either a tie or still in progress.
        return this.moveCount === 9 ? null : undefined;
    }
}

export default Board;
