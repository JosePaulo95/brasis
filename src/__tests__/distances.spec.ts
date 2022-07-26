import BoardController from "@/Brasis/controllers/board"
import BoardModel from "@/Brasis/models/board";
import { Point } from "@/Brasis/models/Point";


describe('paths and distances calcs', () => {
    it('distance between 2 points', async () => {
        const model = new BoardModel("5x5 w/ 2 allies");
        const controller = new BoardController(model);
        
        const a = new Point(2,0)
        const b = new Point(2,2)

        expect(controller.getDistance(a,a)).toEqual(0)
        expect(controller.getDistance(a,b)).toEqual(Infinity)
        expect(controller.getDistance(b,a)).toEqual(2)
    })
    it('shortest path', async () => {
        const model = new BoardModel("5x5 w/ 2 allies");
        const controller = new BoardController(model);
        
        const a = new Point(2,2)
        const b = new Point(2,1)
        const c = new Point(2,0)
        const path = controller.calcShortestPath(a, c)

        expect(path[0].match(a)).toBe(true)
        expect(path[1].match(b)).toBe(true)
        expect(path[2].match(c)).toBe(true)
    })
})