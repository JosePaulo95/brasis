import BaseLayerModel from "./BaseLayerModel";
import { Point } from "./Point";

export class BaseLayerContainer <T extends BaseLayerModel> {
    board: T[][];

    constructor (c: any, id_table: Array<Array<number>>) {
        this.board = id_table.map(row => 
            row.map(cell =>
                new c(cell)
            )
        )
        debugger
    }

    at (a: Point, b?: undefined) : T;
    at (a: number, b: number) : T;
    at (a: any, b: any) : T {
        if(typeof b == 'number'){
            return this.board[a] && this.board[a][b]
        }else{
            return this.board[a.x] && this.board[a.x][a.y]
        }
    }

    swap (p1: Point, p2: Point) {
        const aux = this.at(p1)
        this.board[p1.x][p1.y] = this.board[p2.x][p2.y]
        this.board[p2.x][p2.y] = aux
    }
}