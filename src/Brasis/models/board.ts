
export default class BoardModel{
    default_board: Array<Array<number>>;
    bg_board: Array<Array<number>>;

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
    }
}
