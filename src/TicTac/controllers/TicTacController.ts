import { IBaseController } from "@/interfaces/controllers/IBaseController";
import { IBaseMove } from "@/interfaces/models/IBaseMove";
import { IBaseState } from "@/interfaces/models/IBaseState";
import { TicTacMove } from "../models/TicTacMove";
import {X, O, _} from "../models/TicTacPieceModel"
import { TicTacStateModel } from "../models/TicTacStateModel";

export default class TicTacController implements IBaseController {
    getPossibleMovesEvaluation(state: TicTacStateModel): any[] {
        const move_evaluation = []
        //const possible_moves = this.findNeighbors(state)
        const possible_moves = this.getPossibleMoves(state)

        for (let i = 0; i < possible_moves.length; i++) {
            move_evaluation.push({move: possible_moves[i], eval: this.minimax(state.afterMove(possible_moves[i]))})
        }
        
        return move_evaluation
        //list possible moves from controller
        //apply rule to sort them
        //returns the first
    }
    minimax(state: IBaseState): number{
        if(this.eval(state.board) != "?"){
            return Number(this.eval(state.board))
        }
        const possible_moves = this.getPossibleMoves(state)
        const better = state.maximize?Math.max:Math.min
        let best = state.maximize?-10:+10

        for (let i = 0; i < possible_moves.length; i++) {
            best = better(best, this.minimax(state.afterMove(possible_moves[i]))) 
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
    getPossibleMoves(state: IBaseState): IBaseMove[] {
        const moves = []
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                if(state.board[i][j] == _){
                    let move = new TicTacMove(i,j, state.next_player)
                    moves.push(move)
                }
            }
        }
    
        return moves
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
