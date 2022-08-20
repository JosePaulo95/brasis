
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

    match (a: Point, b?: undefined) : boolean;
    match (a: number, b: number) : boolean;
    match (a: any, b: any) : boolean {
        if(typeof b == 'number'){
            return a == this.x && b == this.y
        }else{
            return a.x == this.x && a.y == this.y
        }
    }
}