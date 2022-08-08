import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";
import { PlayerModel } from "@/Brasis/models/PlayerModel";
import { Point } from "@/Brasis/models/Point";

describe('turn management', () => {
    it("knows if it is over", async () => {
        const boardModel1 = new BoardModel("dev1")
        const boardModel2 = new BoardModel("5x5 w/ allies and enemies")
        
        expect(boardModel1.evaluate()).toBe(1)
        expect(boardModel2.evaluate()).toBe(0)
    })

    it("only allow player to move his own units", () => {
        const boardModel = new BoardModel("5x5 w/ allies and enemies");        
        const boardController = new BoardController(boardModel);

        expect(boardModel.getRound()).toBe(0)
        expect(boardModel.getCurrentTeam()).toBe("teamA")

        const pt1 = new Point(1,1)
        boardController.selectActor(pt1)
        expect(boardModel.action_square_board.hasAny()).toBe(false)

        const pt2 = new Point(2,2)
        boardController.selectActor(pt2)
        expect(boardModel.action_square_board.hasAny()).toBe(true)
    })
})