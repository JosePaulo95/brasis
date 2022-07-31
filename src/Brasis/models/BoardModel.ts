import ActorLayerModel from "./ActorLayerModel";
import { BaseLayerContainer } from "./BaseLayerContainer";
import BaseLayerModel from "./BaseLayerModel";
import BgLayerModel from "./BgLayerModel";
import HUDLayerModel from "./HUDLayerModel";

export default class BoardModel{
    default_board: Array<Array<BaseLayerModel>>;
    bg_board: Array<Array<BgLayerModel>>;
    actors_board: BaseLayerContainer<ActorLayerModel>;
    hud_board: Array<Array<HUDLayerModel>>;

    constructor(level_code?:string){
        switch (level_code) {
            case "dev1":
                this.default_board = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ].map(row => row.map(cell => new BaseLayerModel(cell)))
                
                this.bg_board = [
                    [55,55,55,55],
                    [55,55,55,55],
                    [55,55,55,55],
                    [55,55,55,55]
                ].map(row => row.map(cell => new BgLayerModel(cell)))
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0,0],
                    [0,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ])
        
                this.hud_board = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ].map(row => row.map(cell => new HUDLayerModel(cell)))
                break;
            case "5x5 w/ 2 allies":
                this.default_board = [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ].map(row => row.map(cell => new BaseLayerModel(cell)))
                
                this.bg_board = this.default_board.map(
                    i=>i.map(j=>55)
                ).map(row => row.map(cell => new BgLayerModel(cell)))
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,1,0,0],
                    [0,0,1,0,0],
                    [0,0,0,0,0]
                ])
        
                this.hud_board = [
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0]
                ].map(row => row.map(cell => new HUDLayerModel(cell)))
                break;
            default:
                this.default_board = [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                ].map(row => row.map(cell => new BaseLayerModel(cell)))
                
                this.bg_board = [
                    [55,55,55],
                    [55,55,55],
                    [55,55,55],
                ].map(row => row.map(cell => new BgLayerModel(cell)))
                
                this.actors_board = new BaseLayerContainer(ActorLayerModel, [
                    [0,0,0],
                    [0,1,0],
                    [0,0,0],
                ])
        
                this.hud_board = [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                ].map(row => row.map(cell => new HUDLayerModel(cell)))        
                break;
        }   
    }
}
