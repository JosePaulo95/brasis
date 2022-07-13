import { IBaseController } from "@/interfaces/controllers/IBaseController";
import { IBaseAgent } from "@/interfaces/IBaseAgent"
import { IBaseMove } from "@/interfaces/models/IBaseMove";
import { IBaseState } from "@/interfaces/models/IBaseState";
import { TicTacStateModel } from "@/TicTac/models/TicTacStateModel";

export class BasicMiniMaxAgent implements IBaseAgent{
  getNextMove (controller: IBaseController, state: IBaseState): IBaseMove {
    const moves = this.getPossibleMovesEvaluation(controller, state);
    const asc_sorted = moves.sort((a,b) => b.eval-a.eval)
    const best = state.maximize?asc_sorted[0]:asc_sorted[asc_sorted.length-1]
    return best.move
  }
  getPossibleMovesEvaluation(controller: IBaseController, state: IBaseState) {
    const move_evaluation = []
    const possible_moves = controller.getPossibleMoves(state)

    for (let i = 0; i < possible_moves.length; i++) {
        move_evaluation.push({move: possible_moves[i], eval: this.minimax(controller, state.afterMove(possible_moves[i]))})
    }
    
    return move_evaluation
  }
  minimax(controller: IBaseController, state: IBaseState): number{
    if(controller.eval(state.board) != "?"){
        return Number(controller.eval(state.board))
    }
    const possible_moves = controller.getPossibleMoves(state)
    const better = state.maximize?Math.max:Math.min
    let best = state.maximize?-10:+10

    for (let i = 0; i < possible_moves.length; i++) {
        best = better(best, this.minimax(controller, state.afterMove(possible_moves[i]))) 
    }
    return best 
  }
}