import { TicTacStateModel } from "@/TicTac/models/TicTacStateModel";
import { IBaseState } from "../models/IBaseState";

export interface IBaseController {
    findNeighbors(state: IBaseState): IBaseState[];
    readPhase(board: string[][]): string;
    getPossibleMovesEvaluation(state: TicTacStateModel): any[];
}
