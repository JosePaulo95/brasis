import BoardController from '@/Brasis/controllers/board'
import BoardModel from '@/Brasis/models/board'

describe('board component', () => {
  it('neighbors level adjacents', async () => {
    const model = new BoardModel("dev1")
    const controller = new BoardController(model);
    const neighbors = controller.getNeighbors(1,1,1)
    console.log(neighbors);
    expect(neighbors.length).toEqual(4)
  })

  it('action possibleMoves', async () => {
    const model = new BoardModel("3x3 actor in center")
    const controller = new BoardController(model);

    controller.triggersInteraction("showPossibleMoves", 1, 1)
    expect(model.hud_board[0][0].value).toEqual(0)
    expect(model.hud_board[1][1].value).toEqual(0)

    expect(model.hud_board[1][0].value).toEqual(1)
    expect(model.hud_board[0][1].value).toEqual(1)
    expect(model.hud_board[1][2].value).toEqual(1)
    expect(model.hud_board[2][1].value).toEqual(1)

    //prev_act  cur
    //v         hud   action(move)
    //v         act   dismiss, possibleMoves
    //v         bg    dismiss
    //f         hud   x
    //f         act   possibleMoves
    //f         bg    -
  })
})
