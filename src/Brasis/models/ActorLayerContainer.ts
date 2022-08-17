import ActorLayerModel from "./ActorLayerModel";
import { BaseLayerContainer } from "./BaseLayerContainer";
import { Point } from "./Point";

export class ActorLayerContainer extends BaseLayerContainer <ActorLayerModel> {

    sameTeam(a: Point, b: Point): boolean {
        if(this.at(a).value && this.at(b).value ){
           return this.at(a).team==this.at(b).team
        }else{
            return true
        }
    }
    
}