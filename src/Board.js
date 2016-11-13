class Board {
    constructor(state){
        // Right now, undefined means empty, true is the human player, and false
        // is the robot player.
        // Right now, we assume valid input.
        this.state = [new Array(3), new Array(3), new Array(3)];
        if (state){
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    this.state[i][j] = state[i][j];
                }
            }
        }
    }

    move(player, row, column){
        if (!this.isLegalMove(row, column)){
            console.error("An illegal move was attempted.");
            return this;
        }

        const newState = [new Array(3), new Array(3), new Array(3)];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                newState[i][j] = this.state[i][j];
            }
        }
        newState[row][column] = player;
        return new Board(newState);
    }

    isLegalMove(row, column){
        return this.state[row][column] === undefined;
    }
}

export default Board;
