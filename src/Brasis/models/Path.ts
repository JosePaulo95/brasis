import { Point } from "./Point";


export class Path {
    path: Point[];
    endpoint: Point;

    constructor (points: Point[]) {
        this.path = points;    
        this.endpoint = points[points.length-1]
    }
}