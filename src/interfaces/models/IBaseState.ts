import { IBaseMove } from "./IBaseMove";

export interface IBaseState {
    board: string[][];
    next_player: string;
    maximize: boolean;
    afterMove: (move: IBaseMove) => IBaseState;
}
