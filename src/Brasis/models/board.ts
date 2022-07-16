
export default class BoardModel{
    default_board: Array<Array<number>>;
    bg_board: Array<Array<number>>;
    actors_board: Array<Array<number>>;
    hud_board: Array<Array<number>>;

    constructor(level_code="dev"){
        this.default_board = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ]
        
        this.bg_board = [
            [55,55,55],
            [55,55,55],
            [55,55,55],
        ]
        
        this.actors_board = [
            [0,0,0],
            [0,1,0],
            [0,0,0],
        ]

        this.hud_board = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ]
    }
    propagateSelection({ old_x, old_y, x, y}:{ old_x:number, old_y:number, x:number, y:number}): BoardModel {
        //se old é um ator e current é espaço vazio
        //mover
        const prev_actor = old_x!=undefined?this.actors_board[old_x][old_y]:null
        const current_empty = this.actors_board[x][y]==0
        
        if(prev_actor && current_empty){
            this.actors_board[old_x][old_y] = 0
            this.actors_board[x][y] = 1
        }
        return this
    }
}
