import BoardController from "@/Brasis/controllers/BoardController";
import ActorLayerModel from "@/Brasis/models/ActorLayerModel";
import BoardModel from "@/Brasis/models/BoardModel";
import { Point } from "@/Brasis/models/Point";


describe("Attack interaction", ()=>{
    it("shows attack square", async () => {
        const boardModel = new BoardModel("4x4 x1 with obstacles and units");
        const boardController = new BoardController(boardModel);
        //00 01
        //10 11
        await boardController.select(2,1)

        expect(boardModel.action_square_board.at(1, 1).value).toEqual(4)
    })

    it("[bug] shows attack square even when cornered", async () => {
        const boardModel = new BoardModel("3x3 interleaved and full");
        const boardController = new BoardController(boardModel);

        const squares = boardController.mapper.getReachableEnemiesFrom(1,1)

        expect(squares.some(p => p.match(0,0))).toBeFalsy()

        expect(squares.some(p => p.match(0, 1))).toBeTruthy()
        expect(squares.some(p => p.match(1, 0))).toBeTruthy()
        expect(squares.some(p => p.match(1, 2))).toBeTruthy()
        expect(squares.some(p => p.match(2, 1))).toBeTruthy()
    })

    it("attacker faces attacked", async () => {
        const actor = new ActorLayerModel(1); 

        const center =  new Point(1,1)
        const left =    new Point(1,0)
        const right =   new Point(1,2)
        const top =     new Point(0,1)
        const bottom =  new Point(2,1)

        const d_left = actor.getsDirection(center, left)
        const d_right = actor.getsDirection(center, right)
        const d_top = actor.getsDirection(center, top)
        const d_bottom = actor.getsDirection(center, bottom)

        expect(d_left).toEqual("left")
        expect(d_right).toEqual("right")
        expect(d_top).toEqual("top")
        expect(d_bottom).toEqual("bottom")
    })
})