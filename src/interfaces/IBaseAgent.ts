import { IBaseController } from "./controllers/IBaseController";
import { IBaseMove } from "./models/IBaseMove";
import { IBaseState } from "./models/IBaseState";

export interface IBaseAgent {
    getNextMove: (controller: IBaseController, state: IBaseState) => IBaseMove;
    getPossibleMovesEvaluation: (controller: IBaseController, state: IBaseState) => IBaseMove[];
}
