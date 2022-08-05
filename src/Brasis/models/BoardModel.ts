import ActorLayerModel from "./ActorLayerModel";
import { BaseLayerContainer } from "./BaseLayerContainer";
import BaseLayerModel from "./BaseLayerModel";
import BgLayerModel from "./BgLayerModel";
import ActionSquareLayerModel from "./ActionSquareLayerModel";

export default class BoardModel{
    default_board: Array<Array<number>>;
    bg_board: BaseLayerContainer<BgLayerModel>;
    actors_board: BaseLayerContainer<ActorLayerModel>;
    action_square_board: BaseLayerContainer<ActionSquareLayerModel>;

    constructor(level_code?:string){
        switch (level_code) {
            case "dev1":
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
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0,0],
                    [0,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
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
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,1,0,0],
                    [0,0,1,0,0],
                    [0,0,0,0,0]
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ])
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
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0,0,2],
                    [0,2,0,0,2],
                    [0,0,1,0,0],
                    [0,1,1,0,0],
                    [0,0,0,0,0]
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ])
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
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0],
                    [0,1,0],
                    [0,0,0],
                ])
        
                this.action_square_board = new BaseLayerContainer(ActionSquareLayerModel, [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                ])       
                break;
        }   
    }
}
