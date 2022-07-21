
export class Point {
    x: number
    y: number
    
    constructor(x:number, y:number){
        this.x = x
        this.y = y
    }
    set(x:number, y:number) {
        this.x = x
        this.y = y
    }
    match(p: Point): boolean {
        return p.x == this.x && p.y == this.y
    }
}