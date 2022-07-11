import { IBaseMove } from "../../interfaces/models/IBaseMove";
import { IBaseState } from "../../interfaces/models/IBaseState";
import { X, O, _ } from "./TicTacPieceModel";

export class TicTacStateModel implements IBaseState{
    board: string[][];
    next_player: string;
    
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