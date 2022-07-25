
export default class BaseLayerModel{
    public value!: number;
    public id: string;
    public static next_id = 0;

    constructor(value = 0){
        this.value = value;
        this.id = String(BaseLayerModel.next_id);
        BaseLayerModel.next_id++;
    }
}