import BoardController from '@/Brasis/controllers/board'
import BoardModel from '@/Brasis/models/board'

describe('board component', () => {
  it('gets ordered layer', async () => {
    const model = new BoardModel()
    const controller = new BoardController(model);
    model.hud_board[1][2].value=1
    expect(controller.getTopLayer(0,0)).toBe("bg")
    expect(controller.getTopLayer(1,1)).toBe("actor")
    expect(controller.getTopLayer(1,2)).toBe("hud")
    expect(controller.getTopLayer(undefined,undefined)).toBe("")
  })

  it('neighbors level adjacents', async () => {
    const model = new BoardModel("5x5 w/ 2 allies")
    const controller = new BoardController(model);
    const neighbors = controller.getNeighbors(2,2,1)
    console.log(neighbors);
    expect(neighbors.length).toEqual(3)
  })

  it('action possibleMoves', async () => {
    const model = new BoardModel("5x5 w/ 2 allies")
    const controller = new BoardController(model);

    controller.triggersInteraction("showPossibleMoves", 2, 2)
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
    await controller.moveActor(1,2,1,1)
    expect(model.actors_board[1][1].value).toEqual(0)
    expect(model.actors_board[1][2].value).toEqual(1)
  })
  it('dismiss hud', async () => {
    const model = new BoardModel("3x3 actor in center")
    const controller = new BoardController(model);

    controller.selectActor(1,1)
    controller.dismissHUD()
    expect(model.hud_board[1][0].value).toEqual(0)
    expect(model.hud_board[0][1].value).toEqual(0)
    expect(model.hud_board[1][2].value).toEqual(0)
    expect(model.hud_board[2][1].value).toEqual(0)
  })
})
