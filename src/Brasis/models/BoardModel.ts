import ActorLayerModel from "./ActorLayerModel";
import { BaseLayerContainer } from "./BaseLayerContainer";
import BaseLayerModel from "./BaseLayerModel";
import BgLayerModel from "./BgLayerModel";
import ActionSquareLayerModel from "./ActionSquareLayerModel";
import WallLayerModel from "./WallLayerModel";
import { Point } from "./Point";
import { ActorLayerContainer } from "./ActorLayerContainer";

export default class BoardModel{
    default_board: Array<Array<number>>;
    bg_board: BaseLayerContainer<BgLayerModel>;
    walls_board: BaseLayerContainer<WallLayerModel>;
    actors_board: ActorLayerContainer;
    action_square_board: BaseLayerContainer<ActionSquareLayerModel>;

    round = 0;

    constructor(level_code?:string){
        this.round = 0;

        switch (level_code) {
            case "4x4 alone unit":
                this.default_board = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                
                this.bg_board = new BaseLayerContainer(BgLayerModel, [
                    [55,55,55,55],
                    [55,55,55,55],
                    [55,55,55,55],
                    [55,55,55,55]
                ])
                
                this.actors_board = new ActorLayerContainer(ActorLayerModel, [
                    [0,0,0,0],
                    [0,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, this.default_board)
                this.walls_board = new BaseLayerContainer(WallLayerModel, this.default_board)
                break;
            case "4x4 x1 with obstacles and units":
                this.default_board = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                
                this.bg_board = new BaseLayerContainer(BgLayerModel, [
                    [55,55,55,55],
                    [55,55,36,36],
                    [55,55,55,55],
                    [55,55,55,55]
                ])
                
                this.actors_board = new ActorLayerContainer(ActorLayerModel, [
                    [0,0,0,0],
                    [0,2,0,0],
                    [0,0,1,0],
                    [0,0,0,0],
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, this.default_board)
                this.walls_board = new BaseLayerContainer(WallLayerModel, [
                    [0,0,0,0],
                    [0,0,214,214],
                    [0,0,0,0],
                    [0,0,0,0]
                ])
                break;
            case "5x5 w/ 2 allies":
                this.default_board = [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ]
                
                this.bg_board = new BaseLayerContainer(BgLayerModel,[
                    [55,55,55,55,55],
                    [55,55,55,55,55],
                    [55,55,55,55,55],
                    [55,55,55,55,55],
                    [55,55,55,55,55]
                ])
                
                this.actors_board = new ActorLayerContainer(ActorLayerModel, [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,1,0,0],
                    [0,0,1,0,0],
                    [0,0,0,0,0]
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, this.default_board)
                this.walls_board = new BaseLayerContainer(WallLayerModel, this.default_board)
                break;
            case "5x5 w/ allies and enemies":
                this.default_board = [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ]
                
                this.bg_board = new BaseLayerContainer(BgLayerModel,[
                    [0,1,2,3,55],
                    [11,12,13,14,55],
                    [22,23,24,25,55],
                    [33,34,35,55,55],
                    [55,55,55,55,36]
                ])
                
                this.actors_board = new ActorLayerContainer(ActorLayerModel, [
                    [0,0,0,0,2],
                    [0,2,0,0,2],
                    [0,0,1,0,0],
                    [0,1,1,0,0],
                    [0,0,0,0,0]
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, this.default_board)
                this.walls_board = new BaseLayerContainer(WallLayerModel, this.default_board)
                break;
            case "2x2 w/ ally and enemy":
                this.default_board = [
                    [0,0],
                    [0,0],
                ]
                
                this.bg_board = new BaseLayerContainer(BgLayerModel,[
                    [0,36],
                    [36,0],
                ])
                
                this.actors_board = new ActorLayerContainer(ActorLayerModel, [
                    [2,0],
                    [0,1],
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, this.default_board)
                this.walls_board = new BaseLayerContainer(WallLayerModel, this.default_board)
                break;
            default:
                this.default_board = [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                ]
                
                this.bg_board = new BaseLayerContainer(BgLayerModel, [
                    [55,55,55],
                    [55,55,55],
                    [55,55,55],
                ])
                
                this.actors_board = new ActorLayerContainer(ActorLayerModel, [
                    [0,0,0],
                    [0,1,0],
                    [0,0,0],
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, this.default_board)
                this.walls_board = new BaseLayerContainer(WallLayerModel, this.default_board)
                break;
        }   
    }

    evaluate(): number {
        const any_teamA = this.actors_board.hasAny(a=>a.team == "teamA")
        const any_teamB = this.actors_board.hasAny(a=>a.team == "teamB")

        if(any_teamA && !any_teamB){
            return 1;
        }
        if(!any_teamA && any_teamB){
            return -1;
        }
        return 0;
    }

    getRound () : number {
        return this.round;
    }

    getCurrentTeam () : string {
        return this.round%2?"teamB":"teamA";
    }

    getNeighbors (p: Point) {
        const n = [
            new Point(p.x-1, p.y),
            new Point(p.x, p.y-1),
            new Point(p.x+1, p.y),
            new Point(p.x, p.y+1)
        ]
        return n.filter(n=>
            this.bg_board.at(n)
            && this.walls_board.at(n).value == 0
            && this.actors_board.sameTeam(p, n)
        )
    }
}
