import ActorLayerModel from "./ActorLayerModel";
import BoardModel from "./BoardModel";
import { PlayerModel } from "./PlayerModel";


export class LevelModel {
    board: BoardModel;
    turn = 1;
    current_team: string;
    player1: PlayerModel;
    player2: PlayerModel;

    constructor (board: BoardModel, p1: PlayerModel, p2: PlayerModel) {
        this.board = board;
        this.current_team = p1.team;
        this.player1 = p1;
        this.player2 = p2;
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
        return this.player1.team == this.current_team;
    }
}