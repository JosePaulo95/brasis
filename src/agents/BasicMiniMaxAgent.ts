import { IBaseController } from "@/interfaces/controllers/IBaseController";
import { IBaseAgent } from "@/interfaces/IBaseAgent"
import { IBaseMove } from "@/interfaces/models/IBaseMove";
import { IBaseState } from "@/interfaces/models/IBaseState";

export class BasicMiniMaxAgent implements IBaseAgent{
  nextMove(controller: IBaseController, state: IBaseState): IBaseMove{
    const node_evaluation = []
    const possible_moves = controller.findNeighbors(state)

    for (let i = 0; i < possible_moves.length; i++) {
        node_evaluation.push({state: possible_moves[i], eval: this.minimax(possible_moves[i])})
    }
    
    return node_evaluation
    //list possible moves from controller
    //apply rule to sort them
    //returns the first
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

}