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
        
        expect(level1.player1wins()).toBe(true)
        expect(level2.player1wins()).toBe(false)
    })
})