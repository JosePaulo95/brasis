import BoardModel from "../models/board";

export default class BoardController{
    model = {} as BoardModel

    constructor(model: BoardModel){
        this.model = model
    }
    select(x: number, y: number): BoardModel {
        return this.model
    }
}
