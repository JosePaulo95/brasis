import { _, X, O } from "./TicTacPieceModel";

export class TicTacStateModel {
    constructor(board=[[_, _, _], [_, _, _], [_, _, _]], mark=X){
        this.board = board
        this.next_player = mark
    }

    afterMove(move) {
        const board_after_move = JSON.parse(JSON.stringify(this.board))
        board_after_move[move.x][move.y] = move.mark
        const new_state = new TicTacStateModel(board_after_move, this.opposite(move.mark))

        return new_state
    }

    opposite (mark){
        return mark==O?X:O
    }
}