import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";


describe("Attack interaction", ()=>{
    it("shows attack square", async () => {
        const boardModel = new BoardModel("4x4 x1 with obstacles and units");
        const boardController = new BoardController(boardModel);

        //00 01
        //10 11

        await boardController.select(2,1)

        expect(boardModel.action_square_board.at(1, 1).value).toEqual(4)
    })
})