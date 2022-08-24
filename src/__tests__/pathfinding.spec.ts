import { Mapper } from "@/agents/Mapper";
import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";

describe("pathfinding", () =>{
    it("it knows possible moves", ()=>{
        const board = new BoardModel("4x4 x1 with obstacles and units")
        const mapper = new Mapper(board)

        const possible_moves1 = mapper.getPossibleMovesOf(2,1)
        
        expect(possible_moves1.some(p => p.match(1,1))).toBe(false)
        expect(possible_moves1.some(p => p.match(1,2))).toBe(false)
        expect(possible_moves1.length >= 7).toBeTruthy()

        const possible_moves2 = mapper.getPossibleMovesOf(1,1)
        
        expect(possible_moves2.some(p => p.match(2,2))).toBe(false)
        expect(possible_moves2.some(p => p.match(3,1))).toBe(false)
        expect(possible_moves2.length >= 5).toBeTruthy()
    })

    it("[ghost-bug-directed] it knows possible moves after move", async ()=>{
        const board = new BoardModel("4x4 x1 with obstacles and units")
        const controller = new BoardController(board)

        await controller.select(2,1)
        await controller.select(2,2)

        const possible_moves2 = controller.mapper.getPossibleMovesOf(1,1)
        
        expect(possible_moves2.some(p => p.match(2,1))).toBe(true)
        expect(possible_moves2.some(p => p.match(3,1))).toBe(true)
        expect(possible_moves2.length >= 7).toBeTruthy()//equality has a duplicata bug
    })

    it("[over-ally-bug-directed] occupied houses can be path but not destiny", ()=>{
        const board = new BoardModel("5x5 w/ allies and enemies")
        const mapper = new Mapper(board)

        const possible_moves = mapper.getPossibleMovesOf(2,2)
        
        expect(possible_moves.some(p => p.match(3,2))).toBe(false)
        expect(possible_moves.some(p => p.match(4,2))).toBe(true)
    })
})