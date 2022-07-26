import BoardController from '@/Brasis/controllers/board'
import BoardModel from '@/Brasis/models/board'
import { Point } from '@/Brasis/models/Point'

describe('board component', () => {
  it('gets ordered layer', async () => {
    const model = new BoardModel()
    const controller = new BoardController(model);
    const p1 = new Point(0,0)
    const p2 = new Point(1,1)
    const p3 = new Point(1,2)
    model.hud_board[p3.x][p3.y].value=1
    expect(controller.getTopLayer(p1)).toBe("bg")
    expect(controller.getTopLayer(p2)).toBe("actor")
    expect(controller.getTopLayer(p3)).toBe("hud")
    expect(controller.getTopLayer(undefined)).toBe("")
  })

  it('neighbors level adjacents', async () => {
    const model = new BoardModel("5x5 w/ 2 allies")
    const controller = new BoardController(model);
    const p = new Point(2,2)
    const neighbors = controller.getNeighbors(p,1)
    console.log(neighbors);
    expect(neighbors.length).toEqual(3)
  })

  it('action possibleMoves', async () => {
    const model = new BoardModel("5x5 w/ 2 allies")
    const controller = new BoardController(model);
    const p = new Point(2,2)
    controller.selectActor(p)
    expect(model.hud_board[0][1].value).toEqual(0)
    expect(model.hud_board[1][0].value).toEqual(0)

    expect(model.hud_board[1][2].value).toEqual(1)
    expect(model.hud_board[2][1].value).toEqual(1)
    expect(model.hud_board[2][3].value).toEqual(1)
    expect(model.hud_board[2][0].value).toEqual(1)
    expect(model.hud_board[1][1].value).toEqual(1)
    expect(model.hud_board[0][2].value).toEqual(1)
    expect(model.hud_board[1][3].value).toEqual(1)
    expect(model.hud_board[2][4].value).toEqual(1)
    expect(model.hud_board[3][1].value).toEqual(1)
    expect(model.hud_board[3][3].value).toEqual(1)

    expect(model.hud_board[3][2].value).toEqual(0)
    expect(model.hud_board[4][2].value).toEqual(0)

    //prev_act  cur
    //v         hud   action(move)
    //v         act   dismiss, possibleMoves
    //v         bg    dismiss
    //f         hud   x
    //f         act   possibleMoves
    //f         bg    -
  })
  it('moves actor', async () => {
    const model = new BoardModel("3x3 actor in center")
    const controller = new BoardController(model);

    expect(model.actors_board[1][1].value).toEqual(1)
    expect(model.actors_board[1][2].value).toEqual(0)
    await controller.moveActor(new Point(1,2), new Point(1,1))
    expect(model.actors_board[1][1].value).toEqual(0)
    expect(model.actors_board[1][2].value).toEqual(1)
  })
  it('dismiss hud', async () => {
    const model = new BoardModel("3x3 actor in center")
    const controller = new BoardController(model);
    const p = new Point(1, 1)
    controller.selectActor(p)
    controller.dismissHUD()
    expect(model.hud_board[1][0].value).toEqual(0)
    expect(model.hud_board[0][1].value).toEqual(0)
    expect(model.hud_board[1][2].value).toEqual(0)
    expect(model.hud_board[2][1].value).toEqual(0)
  })
})
