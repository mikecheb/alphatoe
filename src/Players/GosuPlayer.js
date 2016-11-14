import Player from './Player.js';
import * as Utilities from '../Utilities.js';

/**
 * This player never loses. It follows the strategy described by Newell and
 * Simon in 1972. See https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy.
 */
class GosuPlayer extends Player {
    constructor(){
        super();
    }

    /**
     * The Newell and Simon strategy consists of 8 steps. Each turn, the player
     * checks whether each step is possible. The first step that is possible is
     * the optimal one.
     * Each step has its own helper function in this class. Each helper
     * function, given a board state and a list of legal moves, returns a subset
     * of those moves that meet its criteria. The first function that returns a
     * non-empty list is thus the optimal one.
     */
    move(board){
        // Map step number to helper function.
        let step = 0;
        const steps = {
            0: this.findWinningMoves,
            1: this.findLosingMoves,
            2: this.findForkMoves,
            3: this.findForkBlockingMoves,
            4: this.findCenterMoves,
            5: this.findOppositeCornerMoves,
            6: this.findCornerMoves,
            7: this.findSideMoves
        };

        const legalMoves = board.getLegalMoves();
        let advisableMoves = [];

        // Go through each step until one returns a non-empty list of moves.
        while (advisableMoves.length === 0){
            // Fall back to random play if none of the eight steps are possible.
            // This point shouldn't be reached unless the steps are buggy.
            if (!steps[step]){
                console.error("Found no advisable moves.");
                advisableMoves = legalMoves;
            }

            // Call the current helper function.
            advisableMoves = steps[step].call(this, board, legalMoves);
            step++;
        }

        // Pick randomly from the optimal moves. This gives our player a little
        // more character as they won't always pick the same option if there is
        // more than one equally optimal move.
        return Utilities.pick(advisableMoves);
    }

    /**
     * Step 1: If there's a winning move, take it.
     */
    findWinningMoves(board, moves){
        return moves.filter(move => {
            const newBoard = board.move(false, move.row, move.column);
            return newBoard.winner === false;
        });
    }

    /**
     * Step 2: If the human has a winning move, block it.
     */
    findLosingMoves(board, moves){
        return moves.filter(move => {
            const newBoard = board.move(true, move.row, move.column);
            return newBoard.winner === true;
        });
    }

    /**
     * Step 3: If we can create a fork (a board state where we have two ways to
     * win), take it.
     */
    findForkMoves(board, moves){
        return this.findForkMovesForPlayer(board, moves, false);
    }

    /**
     * Step 4: If the opponent can create a fork, force them not to take it by
     * threatening them with a two-in-a-row. Make sure, however, that blocking
     * this threat doesn't create a fork for them.
     *
     * If there isn't a move that fits the above criteria, block the fork by
     * playing there.
     */
    findForkBlockingMoves(board, moves){
        // Find the moves the opponent can make to create a fork.
        const opponentForks = this.findForkMovesForPlayer(board, moves, true);
        if (opponentForks.length === 0)
            return [];

        // Find moves that threaten the opponent without giving them a fork.
        let threateningMoves = [];
        for (let i = 0; i < moves.length; i++){
            // Check whether this move threatens the opponent. It threatens the
            // opponent if it creates a board state where we can win in one
            // move. We lean on the Step 1 function here.
            const newBoard = board.move(false, moves[i].row, moves[i].column);
            const newWinningMoves = this.findWinningMoves(newBoard, moves);
            if (newWinningMoves.length === 0)
                continue;

            // newWinningMoves now contains the moves that the human would need
            // to play to block our threat. Make sure none of these moves create
            // a fork for the opponent.
            /**
             * TODO(mike): I believe newWinningMoves should only ever contain a
             * single move. If it didn't, that would mean that either we created
             * a new fork with that move (covered by Step 2) or we had a winning
             * path and created a new one with that move (covered by Step 1).
             * This should allow us to make this logic a little more readable.
             * If newWinningMoves contained more than one move, then it wouldn't
             * matter what the human did and thus the below filtering would be
             * unnecessary. For the time being I'm leaving this as is, but if I
             * think about it more and decide I'm right, I'll clean this up.
             */
            // TODO(mike): This logic should be cleaned up; it's not clear.
            const viableMoves = newWinningMoves.filter(aiMove => {
                // If this move is identical to a move the human can make to
                // create a fork, then we can't use it as it plays into their
                // hands.
                return opponentForks.findIndex(playerMove => {
                    return aiMove.row === playerMove.row &&
                        aiMove.column === playerMove.column;
                }) === -1;
            });
            threateningMoves = threateningMoves.concat(viableMoves);
        }

        // If we found any moves matching the above criteria, return them.
        if (threateningMoves.length > 0)
            return threateningMoves;

        // Otherwise, block an opponent's fork by playing in that space.
        return opponentForks;
    }

    /**
     * Step 5: Play the center. If it's the first move of the game, the corner
     * gives a non-perfect player more chances to make mistakes. Since we know
     * the human player might not be perfect, we take the corner on the first
     * move.
     *
     * TODO(mike): Give this function a more accurate name.
     */
    findCenterMoves(board, moves){
        if (board.moveCount === 0){
            // We lean on Step 7 logic here.
            return this.findCornerMoves(board, moves);
        } else {
            // Return the center move, if it's legal, or an empty array.
            return moves.filter(move => {
                return move.row === 1 && move.column === 1;
            });
        }
    }

    /**
     * Step 6: Play a corner opposite the opponent.
     */
    findOppositeCornerMoves(board, moves){
        // We lean on Step 7 logic here.
        return this.findCornerMoves(board, moves).filter(move => {
            // Check whether the opponent is in the opposite corner. The insight
            // here is that, given a corner, its opposite corner's coordinates
            // can be found by subtracting 2 from the row number and 2 from the
            // column number, then taking the absolute values. The absolute
            // values essentially "reflect" the board if the coordinates are out
            // of bounds.
            const oppCornerRow = Math.abs(move.row - 2);
            const oppCornerColumn = Math.abs(move.column - 2);
            return board.state[oppCornerRow][oppCornerColumn] === true;
        });

    }

    /**
     * Step 7: Play in a corner square.
     */
    findCornerMoves(board, moves){
        return moves.filter(move => {
            // A tile is in the corner if both its X and Y are either 0 or 2.
            return move.row % 2 === 0 && move.column % 2 === 0;
        });
    }

    /**
     * Step 8: Play in a side square.
     */
    findSideMoves(board, moves){
        return moves.filter(move => {
            // A tile is on the side if the sum of its X and Y are odd.
            // (0, 1), (1,0), (1, 2), and (2, 1)
            return (move.row + move.column) % 2 === 1;
        });
    }

    /**
     * A helper function to find the moves that create a fork for the given
     * player.
     */
    findForkMovesForPlayer(board, moves, player){
        const forkMoves = [];
        // Select the first move.
        for (let i = 0; i < moves.length; i++){
            let winPaths = 0;
            // Select the second move.
            for (let j = 0; j < moves.length; j++){
                // Ignore this if the first and second move are the same.
                if (i === j)
                    continue;

                // Check whether these two moves result in a win.
                // TODO(mike): We should switch this over to lean on Step 1
                // logic.
                const newNewBoard =
                        board.move(player, moves[i].row, moves[i].column).move(
                        player, moves[j].row, moves[j].column);
                if (newNewBoard.winner === player){
                    winPaths++;
                }
            }

            // If the first move resulted in more than one winning second moves,
            // it creates a fork.
            if (winPaths > 1){
                forkMoves.push(moves[i]);
            }
        }
        return forkMoves;
    }
}

export default GosuPlayer;
