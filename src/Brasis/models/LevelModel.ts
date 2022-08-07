import ActorLayerModel from "./ActorLayerModel";
import BoardModel from "./BoardModel";
import { PlayerModel } from "./PlayerModel";


export class LevelModel {
    board: BoardModel;
    turn = 1;

    constructor (board: BoardModel, p1: PlayerModel, p2: PlayerModel) {
        this.board = board;
    }
    
    playerAwins(): boolean {
        return this.playerwins("teamA")
    }
    
    playerBwins(): boolean {
        return this.playerwins("teamB")
    }
    private playerwins(team_id: string): boolean {
        const isOpponent = (actor: ActorLayerModel): boolean => {
            return actor.team != team_id
        }
        
        return !this.board.actors_board.hasAny(isOpponent)
    }
    
    isPlayer1Turn(): boolean {
        return this.turn==1;
    }
}