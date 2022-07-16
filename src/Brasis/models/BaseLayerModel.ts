
export default class BaseLayerModel{
    protected _valor!: Number;

    public get valor(): Number {
        return this._valor;
    }
    public set valor(value: Number) {
        this._valor = value;
    }
}