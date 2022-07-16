
export default class BaseLayerModel{
    protected _value!: number;

    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value;
    }
}