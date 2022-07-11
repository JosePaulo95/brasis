import { IBaseState } from "@/models/IBaseState";

export interface IBaseController {
    findNeighbors(state: IBaseState): IBaseState[];
    readPhase(board: string[][]): string;
}
