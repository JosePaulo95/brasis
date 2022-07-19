
export class Point {
    x: number|undefined
    y: number|undefined
    
    constructor(x?:number, y?:number){
        this.set(x,y)
    }
    set(x?:number, y?:number) {
        this.x = x
        this.y = y
    }
}