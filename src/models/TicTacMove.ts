import { IBaseMove } from "./IBaseMove"

export class TicTacMove implements IBaseMove{
    x: number
    y: number
    mark: string

    constructor(i: number, j: number, mark: string){
        this.mark = mark
        this.x = i
        this.y = j
    }
}