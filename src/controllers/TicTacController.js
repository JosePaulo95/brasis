import { TicTacMove } from "../models/TicTacMove";
import {X, O, _} from "../models/TicTacPieceModel"


export class TicTacController {
    deduceState (board) {
        if(this.countUnits(board, _) == 9){
            return "empty";
        }
        return "?";
    }
    deduceNeighbors (state) {
        const neighbors = []
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                if(state.board[i][j] == _){
                    let move = new TicTacMove(i,j, state.next_player)
                    neighbors.push(state.afterMove(move))
                }
            }
        }
    
        return neighbors
    }

    countUnits (board, unit_type) {
        let count = 0
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if(board[i][j] == unit_type)
                    count++
            }
        }
        return count
    }
}
