import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";
import { PlayerModel } from "@/Brasis/models/PlayerModel";
import { Point } from "@/Brasis/models/Point";

describe('turn management', () => {
    it("knows if it is over", async () => {
        const boardModel1 = new BoardModel("4x4 alone unit")
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

    it("actors cannot move twice in same round", async () => {
        const boardModel = new BoardModel("5x5 w/ allies and enemies");
        const boardController = new BoardController(boardModel);

        expect(boardModel.action_square_board.hasAny()).toBe(false)
        await boardController.select(2,2)
        expect(boardModel.action_square_board.hasAny()).toBe(true)
        await boardController.select(2,3)
        expect(boardModel.action_square_board.hasAny()).toBe(false)
        await boardController.select(2,3)
        expect(boardModel.action_square_board.hasAny()).toBe(false)
    })

    it("rounds pass", async () => {
        const boardModel = new BoardModel("2x2 w/ ally and enemy");
        const boardController = new BoardController(boardModel);

        //00 01
        //10 11

        expect(boardModel.getRound()).toBe(0)
        expect(boardModel.getCurrentTeam()).toBe("teamA")
        await boardController.select(1,1)
        await boardController.select(0,1)
        await boardController.select(0,0)//attacks

        expect(boardModel.getRound()).toBe(1)
        expect(boardModel.getCurrentTeam()).toBe("teamB")
        await boardController.select(0,0)
        await boardController.select(1,0)

        expect(boardModel.getRound()).toBe(2)
        expect(boardModel.getCurrentTeam()).toBe("teamA")
        await boardController.select(0,1)
        await boardController.select(0,0)
    })
})