import BoardModel from "../models/board";
import { InteractionModel } from "../models/InteractionModel";

export default class BoardController{
    model = {} as BoardModel
    old_x!: number;
    old_y!: number;
    interactions: Array<InteractionModel>;
    
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
    select(x: number, y: number): BoardModel {
        const previous_actor = this.getTopLayer(this.old_x, this.old_y)
        const top_current = this.getTopLayer(x, y)
        const event_key = `${previous_actor}>${top_current}` 

        this.interactions.filter(i=>i.match(event_key)).forEach(action => {
            action.method.call(this, x, y, this.old_x, this.old_y)
        }, this);

        // this.interactions.filter(i=>i.event_key==event_key).forEach(action => {
        //     action.method.call(this,x,y)
        // }, this);

        // this.getSubscribedInteractions(event_key).forEach(action => {
        //     action.method.call(x,y)
        // }, this);

        //this.manageActorSelection(x,y)
        //this.manageMove(x,y,this.old_x, this.old_y)

        // this.model.propagateSelection({old_x: this.old_x, old_y: this.old_y, x, y})
        this.old_x = x
        this.old_y = y
        
        return this.model
    }
    getSubscribedInteractions(event_key: string) {
        return this.interactions.filter(i => i.event_key == event_key)
    }
    getTopLayer(x: number|undefined, y: number|undefined) {
        if(x==undefined || y==undefined){
            return ""
        }
        if(this.getHUD(x,y).value){
            return "hud"
        }
        if(this.hasActor(x,y)){
            return "actor"
        }
        return "bg"
    }

    triggersInteraction(action_code: string, x: number, y: number) {
        this.selectActor(x,y)
    }

    moveActor(x: number, y: number, old_x: number, old_y: number) {
        this.model.actors_board[old_x][old_y].value = 0
        this.model.actors_board[x][y].value = 1
    }
    dismissHUD() {
        for (let i = 0; i < this.model.hud_board.length; i++) {
            for (let j = 0; j < this.model.hud_board[i].length; j++) {
                this.model.hud_board[i][j].value = 0
            }
        }
    }
    selectActor(x: number, y: number) {
        const possible_houses_1 = this.getNeighbors(x,y,1).concat(this.getNeighbors(x,y,2))

        for (let i = 0; i < possible_houses_1.length; i++) {
            const house = possible_houses_1[i];
            this.model.hud_board[house.x][house.y].value = 1
        }
    }
    hasActor(x: number, y: number) {
        return this.model.actors_board[x] && this.model.actors_board[x][y].value
    }
    getHUD(x: number, y: number) {
        return this.model.hud_board[x] && this.model.hud_board[x][y]
    }
    getNeighbors(x: number, y: number, d=1, root=true): any {
        if(!this.is_valid_house(x,y) || (this.hasActor(x,y) && !root)){
            return undefined
        }
        
        if(d==0){
            return {x, y}
        }
        return [
            this.getNeighbors(x,    y-1,    d-1, false),
            this.getNeighbors(x,    y+1,    d-1, false),
            this.getNeighbors(x-1,  y,      d-1, false),
            this.getNeighbors(x+1,  y,      d-1, false)
        ].filter(Boolean).flat(d).filter((elm, index, arr) => index == arr.findIndex(i=>i.x==elm.x&&i.y==elm.y))
    }
    is_valid_house(x: number, y: number) {
        return this.model.bg_board[x] && this.model.bg_board[x][y]
    }
}
