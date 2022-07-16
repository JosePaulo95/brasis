import BoardModel from "../models/board";

export default class BoardController{
    model = {} as BoardModel
    old_x!: number;
    old_y!: number;

    constructor(model: BoardModel){
        this.model = model
    }
    select(x: number, y: number): BoardModel {
        this.model.propagateSelection({old_x: this.old_x, old_y: this.old_y, x, y})
        this.old_x = x
        this.old_y = y
        
        return this.model
    }
}
