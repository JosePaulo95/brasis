import { Mapper } from "@/agents/Mapper";
import BoardController from "@/Brasis/controllers/BoardController";
import BoardModel from "@/Brasis/models/BoardModel";
import { Path } from "@/Brasis/models/Path";
import { Point } from "@/Brasis/models/Point";

describe("pathfinding", () =>{
    it("build initial paths", () => {
        const board = new BoardModel("4x4 x1 with obstacles and units")
        const mapper = new Mapper(board)

        expect(mapper.paths_table.length).toBe(4)
        expect(mapper.paths_table[0].length).toBe(4)
        expect(mapper.paths_table[1][1].length).toBe(14)
    })

    it("initial paths are correct (shortest)", () => {
        const board = new BoardModel("4x4 x1 with obstacles and units")
        const mapper = new Mapper(board)

        const pathing_21 = mapper.paths_table[2][1]
        const pathing_21_to_02 = pathing_21.find(p => p.endpoint.match(0,2)) as Path

        expect(pathing_21_to_02.path.length).toBe(6)
    })

    it("it knows possible moves", ()=>{
        const board = new BoardModel("4x4 x1 with obstacles and units")
        const mapper = new Mapper(board)

        const possible_moves1 = mapper.getPossibleMovesOf(2,2)
        
        expect(possible_moves1.some(p => p.match(1,1))).toBe(false)
        expect(possible_moves1.some(p => p.match(1,2))).toBe(false)
        expect(possible_moves1.length).toBe(7)

        const possible_moves2 = mapper.getPossibleMovesOf(1,1)
        
        expect(possible_moves2.some(p => p.match(2,2))).toBe(false)
        expect(possible_moves2.some(p => p.match(3,1))).toBe(false)
        expect(possible_moves2.length).toBe(6)
    })

    it("[ghost-bug-directed] it knows possible moves after move", ()=>{
        const board = new BoardModel("4x4 x1 with obstacles and units")
        const controller = new BoardController(board)


        controller.select(2,1)
        controller.select(2,2)

        const possible_moves2 = controller.mapper.getPossibleMovesOf(1,1)
        
        expect(possible_moves2.some(p => p.match(2,1))).toBe(true)
        expect(possible_moves2.some(p => p.match(3,1))).toBe(true)
        expect(possible_moves2.length).toBe(8)
    })
    // it("knows distant paths", ()=>{
    //     const model = new BoardModel("5x5 w/ 2 allies")
    //     const controller = new BoardController(model)
    //     const expected_path = []
    //     expected_path.push(new Point(0,4))
    //     expected_path.push(new Point(0,3))
    //     expected_path.push(new Point(1,3))
    //     expected_path.push(new Point(2,3))
    //     expected_path.push(new Point(3,3))
    //     expected_path.push(new Point(4,3))
    //     expected_path.push(new Point(4,2))
    //     expected_path.push(new Point(4,1))
        
    //     const path = controller.calcShortestPath(expected_path[0], expected_path[expected_path.length-1])
    //     expect(path[0].match(expected_path[0])).toBe(true)
    //     expect(path[1].match(expected_path[1])).toBe(true)
    //     expect(path[2].match(expected_path[2])).toBe(true)
    //     expect(path[3].match(expected_path[3])).toBe(true)
    //     expect(path[4].match(expected_path[4])).toBe(true)
    //     expect(path[5].match(expected_path[5])).toBe(true)
    //     expect(path[6].match(expected_path[6])).toBe(true)
    //     expect(path[7].match(expected_path[7])).toBe(true)
    // })

    // it("possible move houses", () => {
    //     const model = new BoardModel("5x5 w/ 2 allies")
    //     const mapper = new Mapper(model)

    //     const p = new Point(2,2)
    //     const possible_destinies = mapper.availableFrom(p, 2)
    // })

    // it("possible attack houses", () => {
    //     const model = new BoardModel("5x5 w/ 2 allies")
    //     const controller = new BoardController(model)

    //     const p = new Point(2,2)
    //     const possible_destinies = controller.mapper.availableFrom(p, 2)
    //     const possible_atk = controller.mapper.availableFrom(p, 3)

    //     //remove destinies from attack
    //     //assign where has an enemy
    //     //test each
    // })

    // it("possible shortest path", () => {
    //     const model = new BoardModel("5x5 w/ 2 allies")
    //     const controller = new BoardController(model)

    //     const p = new Point(2,2)
    //     const shortest_path = controller.mapper.getShortestPath(p1, p2)

    //     //test each
    // })
})

//show possible houses = distances/paths table
//shortest path for moving = distances/paths table
//shortest reachable path to far point = A*
//