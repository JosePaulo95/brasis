import { IBaseController } from "./controllers/IBaseController";
import { IBaseMove } from "./models/IBaseMove";
import { IBaseState } from "./models/IBaseState";

export interface IBaseAgent {
    nextMove: (controller: IBaseController, state: IBaseState) => IBaseMove
}
