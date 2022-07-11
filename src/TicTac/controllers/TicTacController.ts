import { IBaseController } from "@/interfaces/controllers/IBaseController";
import { IBaseState } from "@/interfaces/models/IBaseState";
import { TicTacMove } from "../models/TicTacMove";
import {X, O, _} from "../models/TicTacPieceModel"
import { TicTacStateModel } from "../models/TicTacStateModel";

export default class TicTacController implements IBaseController {
    getPossibleMovesEvaluation(state: TicTacStateModel): any[] {
        const node_evaluation = []
        const possible_moves = this.findNeighbors(state)

        for (let i = 0; i < possible_moves.length; i++) {
            node_evaluation.push({state: possible_moves[i], eval: this.minimax(possible_moves[i])})
        }
        
        return node_evaluation
    }

    minimax(state: IBaseState): number{
        if(this.eval(state.board) != "?"){
            return Number(this.eval(state.board))
        }
        const neighbors = this.findNeighbors(state)
        const better = state.maximize?Math.max:Math.min
        let best = state.maximize?-10:+10

        for (let i = 0; i < neighbors.length; i++) {
            best = better(best, this.minimax(neighbors[i])) 
        }
        return best 
    }
    eval(board: string[][]): string {
        if(
            (board[0][0]==X && board[0][1]==X && board[0][2]==X) ||
            (board[1][0]==X && board[1][1]==X && board[1][2]==X) ||
            (board[2][0]==X && board[2][1]==X && board[2][2]==X) ||
            (board[0][0]==X && board[1][0]==X && board[2][0]==X) ||
            (board[0][1]==X && board[1][1]==X && board[2][1]==X) ||
            (board[0][2]==X && board[1][2]==X && board[2][2]==X) ||
            (board[0][0]==X && board[1][1]==X && board[2][2]==X) ||
            (board[2][0]==X && board[1][1]==X && board[0][2]==X)
        ){
            return "1";
        }
        if(
            (board[0][0]==O && board[0][1]==O && board[0][2]==O) ||
            (board[1][0]==O && board[1][1]==O && board[1][2]==O) ||
            (board[2][0]==O && board[2][1]==O && board[2][2]==O) ||
            (board[0][0]==O && board[1][0]==O && board[2][0]==O) ||
            (board[0][1]==O && board[1][1]==O && board[2][1]==O) ||
            (board[0][2]==O && board[1][2]==O && board[2][2]==O) ||
            (board[0][0]==O && board[1][1]==O && board[2][2]==O) ||
            (board[2][0]==O && board[1][1]==O && board[0][2]==O)
        ){
            return "-1";
        }
        if(TicTacController.countUnits(board, _) == 0){
            return "0";
        }
        return "?";
    }
    findNeighbors(state: IBaseState): IBaseState[] {
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
    readPhase(board: string[][]): string {
        if(TicTacController.countUnits(board, _) == 9){
            return "empty";
        }
        return "?";
    }

    static countUnits (board, unit_type) {
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
