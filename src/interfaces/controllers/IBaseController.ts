import { TicTacStateModel } from "@/TicTac/models/TicTacStateModel";
import { IBaseMove } from "../models/IBaseMove";
import { IBaseState } from "../models/IBaseState";

export interface IBaseController {
    getPossibleMoves(state: IBaseState): IBaseMove[];
    readPhase(board: string[][]): string;
    eval(board: string[][]): string;
}
