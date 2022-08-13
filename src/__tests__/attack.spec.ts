import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";


describe("Attack interaction", ()=>{
    it("shows attack square", async () => {
        const boardModel = new BoardModel("2x2 w/ ally and enemy");
        const boardController = new BoardController(boardModel);

        //00 01
        //10 11

        await boardController.select(1,1)

        expect(boardModel.action_square_board.at(0, 1).value).toEqual(1)
        expect(boardModel.action_square_board.at(1, 0).value).toEqual(1)
        expect(boardModel.action_square_board.at(1, 1).value).toEqual(0)
        expect(boardModel.action_square_board.at(0, 0).value).toEqual(2)
    })
})