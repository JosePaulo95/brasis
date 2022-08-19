import ActorLayerModel from "./ActorLayerModel";
import { BaseLayerContainer } from "./BaseLayerContainer";
import { Point } from "./Point";

export class ActorLayerContainer extends BaseLayerContainer <ActorLayerModel> {

    emptyOrSameTeam(a: Point, b: Point): boolean {
        if(this.at(a).value>0 && this.at(b).value>0 ){
            return this.at(a).team==this.at(b).team
        }else{
            return true
        }
    }
    
}