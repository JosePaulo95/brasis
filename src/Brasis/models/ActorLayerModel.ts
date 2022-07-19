import BaseLayerModel from "./BaseLayerModel";

export default class ActorLayerModel extends BaseLayerModel{
    async animMove(dif_x: number, dif_y: number) {
        const steps = this.convertToSteps(dif_x, dif_y);
    }
    convertToSteps(dif_x: number, dif_y: number) {
        const steps: Array<string> = new Array(Math.abs(dif_x)+Math.abs(dif_y))

        const vertical = dif_y>0?"down":"up"
        const horizontal = dif_x>0?"right":"left"

        steps.fill(vertical, 0)
        steps.fill(horizontal, Math.abs(dif_y))
        console.log(steps);
        
        return steps
    }
}