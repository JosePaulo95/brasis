import ActorLayerModel from "./ActorLayerModel";
import BoardModel from "./BoardModel";
import { PlayerModel } from "./PlayerModel";


export class LevelModel {
    board: BoardModel;
    
    constructor (board: BoardModel, p1: PlayerModel, p2: PlayerModel) {
        this.board = board;
    }
    
    player1wins(): boolean {
        const isPlayer2Actor = (cell: ActorLayerModel): boolean => {
            return cell.value%2==0 && cell.value!=0
        }
        
        return !this.board.actors_board.hasAny(isPlayer2Actor)
    }
}