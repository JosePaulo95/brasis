import { IBaseMove } from "./IBaseMove";

export interface IBaseState {
    board: string[][];
    next_player: string;
    afterMove: (move: IBaseMove) => IBaseState;
}
