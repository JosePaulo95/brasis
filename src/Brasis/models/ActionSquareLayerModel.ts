import BaseLayerModel from "./BaseLayerModel";

export default class ActionSquareLayerModel extends BaseLayerModel{
    type: String = "";

    constructor(){
        super()
    }

    public getType(): String {
        switch (this.value) {
            case 1:
                this.type = "move"
                break;
            case 4:
                this.type = "attack"
                break;
            default:
                this.type = ""
                break;
        }
        return this.type;
    }
    public setType(value: String) {
        this.type = value;
    }
}