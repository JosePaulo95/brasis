import { IBaseController } from "@/interfaces/controllers/IBaseController";
import { IBaseMove } from "@/interfaces/models/IBaseMove";
import { IBaseState } from "@/interfaces/models/IBaseState";
import { TicTacMove } from "../models/TicTacMove";
import {X, O, _} from "../models/TicTacPieceModel"
import { TicTacStateModel } from "../models/TicTacStateModel";

export default class TicTacController implements IBaseController {
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

    static countUnits (board: string[][], unit_type: string) {
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
