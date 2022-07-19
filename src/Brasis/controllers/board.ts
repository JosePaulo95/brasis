import BoardModel from "../models/board";
import { InteractionModel } from "../models/InteractionModel";
import { Point } from "../models/Point";

export default class BoardController{
    model = {} as BoardModel
    interactions: Array<InteractionModel>;
    interaction_on = true;
    prev_point: Point|undefined;
    
    constructor(model: BoardModel){
        this.model = model
        this.interactions = [
            new InteractionModel("*", this.dismissHUD),
            new InteractionModel("*>actor", this.selectActor),
            new InteractionModel("actor>hud", this.moveActor),
        ]
    }
    hello(x:number,y:number){
        alert("deu bom"+x+""+y)
    }
    async select(x: number, y: number): Promise<any> {
        const cur_point = new Point(x,y)
        const previous_actor = this.getTopLayer(this.prev_point)
        const top_current = this.getTopLayer(cur_point)
        const event_key = `${previous_actor}>${top_current}` 

        this.interaction_on = false
        const interactions = this.interactions.filter(i=>i.match(event_key))
        for (let i = 0; i < interactions.length; i++) {
            await interactions[i].method.call(this, cur_point, this.prev_point)
        }
        
        this.interaction_on = true
        // this.interactions.filter(i=>i.event_key==event_key).forEach(action => {
        //     action.method.call(this,x,y)
        // }, this);

        // this.getSubscribedInteractions(event_key).forEach(action => {
        //     action.method.call(x,y)
        // }, this);

        //this.manageActorSelection(x,y)
        //this.manageMove(x,y,this.old_x, this.old_y)

        // this.model.propagateSelection({old_x: this.old_x, old_y: this.old_y, x, y})
        this.prev_point = new Point(x,y)
    }
    getSubscribedInteractions(event_key: string) {
        return this.interactions.filter(i => i.event_key == event_key)
    }
    getTopLayer(p?: Point) {
        if(!p){
            return ""
        }
        if(this.getHUD(p)){
            return "hud"
        }
        if(this.hasActor(p)){
            return "actor"
        }
        return "bg"
    }

    async moveActor(cur_point: Point, prev_point?: Point) {
        if(prev_point){
            await delay(500)
            // const actor = this.model.actors_board[prev_point.x][prev_point.y]
            // await actor.animMove(old_x-x, old_y-y)
            this.model.actors_board[prev_point.x][prev_point.y]. value = 0
            this.model.actors_board[cur_point.x][cur_point.y].value = 1
        }
    }
    dismissHUD() {
        for (let i = 0; i < this.model.hud_board.length; i++) {
            for (let j = 0; j < this.model.hud_board[i].length; j++) {
                this.model.hud_board[i][j].value = 0
            }
        }
    }
    selectActor(cur_point: Point, prev_point?: Point) {
        const possible_houses_1 = this.getNeighbors(cur_point,1).concat(this.getNeighbors(cur_point,2))

        for (let i = 0; i < possible_houses_1.length; i++) {
            const house = possible_houses_1[i];
            this.model.hud_board[house.x][house.y].value = 1
        }
    }
    hasActor(p: Point) {
        return this.model.actors_board[p.x] && this.model.actors_board[p.x][p.y].value
    }
    getHUD(p: Point) {
        return this.model.hud_board[p.x] && this.model.hud_board[p.x][p.y].value
    }
    getNeighbors(p: Point, d=1, root=true): any {
        if(!this.is_valid_house(p) || (this.hasActor(p) && !root)){
            return undefined
        }
        
        if(d==0){
            return p
        }
        return [
            this.getNeighbors(new Point(p.x,    p.y-1),    d-1, false),
            this.getNeighbors(new Point(p.x,    p.y+1),    d-1, false),
            this.getNeighbors(new Point(p.x-1,  p.y),      d-1, false),
            this.getNeighbors(new Point(p.x+1,  p.y),      d-1, false)
        ].filter(Boolean).flat(d).filter((elm, index, arr) => index == arr.findIndex(i=>i.x==elm.x&&i.y==elm.y))
    }
    is_valid_house(p: Point) {
        return this.model.bg_board[p.x] && this.model.bg_board[p.x][p.y]
    }
}
function delay(ms: number):any {
    return new Promise(resolve => setTimeout(resolve, ms));
}

