import { Mapper } from "@/agents/Mapper";
import BoardModel from "@/Brasis/models/BoardModel";
import { Point } from "@/Brasis/models/Point";

describe("pathfinding", () =>{
    it("build initial paths", () => {
        const board = new BoardModel("4x4 alone unit")
        const mapper = new Mapper(board)

        expect(mapper.paths_table.length).toBe(4)
        expect(mapper.paths_table[0].length).toBe(4)
        expect(mapper.paths_table[1][1].length).toBe(16)
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