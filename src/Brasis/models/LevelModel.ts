import ActorLayerModel from "./ActorLayerModel";
import BoardModel from "./BoardModel";
import { PlayerModel } from "./PlayerModel";


export class LevelModel {
    board: BoardModel;
    turn = 1;

    constructor (board: BoardModel, p1: PlayerModel, p2: PlayerModel) {
        this.board = board;
    }
    
    player1wins(): boolean {
        return this.playerwins(1)
    }
    
    player2wins(): boolean {
        return this.playerwins(2)
    }
    private playerwins(team_id: number): boolean {
        const team = team_id==1?"ally":"enemy"

        const isOpponent = (actor: ActorLayerModel): boolean => {
            return actor.team != team
        }
        
        return !this.board.actors_board.hasAny(isOpponent)
    }
    
    isPlayer1Turn(): boolean {
        return this.turn==1;
    }
}