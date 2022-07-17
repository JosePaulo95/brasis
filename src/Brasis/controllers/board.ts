import BoardModel from "../models/board";

export default class BoardController{
    model = {} as BoardModel
    old_x!: number;
    old_y!: number;
    
    constructor(model: BoardModel){
        this.model = model
    }
    select(x: number, y: number): BoardModel {

        this.manageActorSelection(x,y)
        this.manageMove(x,y,this.old_x, this.old_y)

        // this.model.propagateSelection({old_x: this.old_x, old_y: this.old_y, x, y})
        this.old_x = x
        this.old_y = y
        
        return this.model
    }

    triggersInteraction(action_code: string, x: number, y: number) {
        this.manageActorSelection(x,y)
    }

    manageMove(x: number, y: number, old_x: number, old_y: number) {
        const prev_actor = this.hasActor(old_x, old_y)
        const cur_hud = this.getHUD(x, y)
        if(prev_actor?.value){
            if(cur_hud.value){

            }else{
                const possible_houses_1 = this.getNeighbors(old_x, old_y, 1)

                for (let i = 0; i < possible_houses_1.length; i++) {
                    const house = possible_houses_1[i];
                    this.model.hud_board[house.x][house.y].value = 0
                }
            }
        }
    }
    manageActorSelection(x: number, y: number) {
        if(this.hasActor(x,y)){
            const possible_houses_1 = this.getNeighbors(x,y,1)

            for (let i = 0; i < possible_houses_1.length; i++) {
                const house = possible_houses_1[i];
                this.model.hud_board[house.x][house.y].value = 1
            }
        }
    }
    hasActor(x: number, y: number) {
        return this.model.actors_board[x] && this.model.actors_board[x][y]
    }
    getHUD(x: number, y: number) {
        return this.model.hud_board[x] && this.model.hud_board[x][y]
    }
    getNeighbors(x: number, y: number, d=1): any {
        if(!this.is_valid_house(x,y)){
            return undefined
        }
        if(d==0){
            return {x, y}
        }
        return [
            this.getNeighbors(x,    y-1,    d-1),
            this.getNeighbors(x,    y+1,    d-1),
            this.getNeighbors(x-1,  y,      d-1),
            this.getNeighbors(x+1,  y,      d-1)
        ].filter(Boolean).flat(d).filter((elm, index, arr) => index == arr.findIndex(i=>i.x==elm.x&&i.y==elm.y))
    }
    is_valid_house(x: number, y: number) {
        return this.model.bg_board[x] && this.model.bg_board[x][y]
    }
}
