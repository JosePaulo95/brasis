import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";
import { LevelModel } from "@/Brasis/models/LevelModel";
import { PlayerModel } from "@/Brasis/models/PlayerModel";

describe('turn management', () => {
    it("knows if it is over", async () => {
        const boardModel1 = new BoardModel("dev1")
        const boardModel2 = new BoardModel("5x5 w/ allies and enemies")
        const p1 = new PlayerModel()
        const p2 = new PlayerModel()

        const level1 = new LevelModel(boardModel1, p1, p2);
        const level2 = new LevelModel(boardModel2, p1, p2);
        
        expect(level1.playerAwins()).toBe(true)
        expect(level2.playerAwins()).toBe(false)
    })

    it("only allow player to move his own units", () => {
        const p1 = new PlayerModel(true);
        const p2 = new PlayerModel();
        const boardModel = new BoardModel("5x5 w/ allies and enemies");
        const boardController = new BoardController(boardModel);

        const level = new LevelModel(boardModel, p1, p2);
        expect(level.isPlayer1Turn()).toBe(true)

        boardController.select(1,1)
        expect(boardModel.action_square_board.hasAny()).toBe(false)
        
        boardController.select(2,2)
        expect(boardModel.action_square_board.hasAny()).toBe(true)
        

    })
})