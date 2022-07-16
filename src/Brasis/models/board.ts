import ActorLayerModel from "./ActorLayerModel";
import BaseLayerModel from "./BaseLayerModel";
import BgLayerModel from "./BgLayerModel";
import HUDLayerModel from "./HUDLayerModel";

export default class BoardModel{
    default_board: Array<Array<BaseLayerModel>>;
    bg_board: Array<Array<BgLayerModel>>;
    actors_board: Array<Array<ActorLayerModel>>;
    hud_board: Array<Array<HUDLayerModel>>;

    constructor(level_code="dev"){
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
        
        this.actors_board = [
            [0,0,0],
            [0,1,0],
            [0,0,0],
        ].map(row => row.map(cell => new ActorLayerModel(cell)))

        this.hud_board = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ].map(row => row.map(cell => new HUDLayerModel(cell)))
        
    }
    propagateSelection({ old_x, old_y, x, y}:{ old_x:number, old_y:number, x:number, y:number}): BoardModel {
        //MOVE current hud select
        //previous hud release
        //current bg select
        //previous actor release
        //previous bg release
        //SHOW_POSSIBLE_MOVES current actor select

        const prev_selected = old_x!=undefined?this.hud_board[old_x][old_y].value:null
        const prev_actor = old_x!=undefined?this.actors_board[old_x][old_y].value:null
        const current_empty = this.actors_board[x][y].value==0

        old_x!=undefined&&(this.hud_board[old_x][old_y].value = 0)

        if(prev_actor && current_empty){
            if(prev_selected){
                this.actors_board[old_x][old_y].value = 0
                this.actors_board[x][y].value = 1
            }else{
                this.hud_board[x][y].value = 1
            }
        }else{
            this.hud_board[x][y].value = 1
        }

        return this
    }
}
