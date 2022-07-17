import BoardController from '@/Brasis/controllers/board'
import BoardModel from '@/Brasis/models/board'
import Board from '@/components/Board.vue'

describe('board component', () => {
  it('selects cells', async () => {
    const model = new BoardModel()
    const controller = new BoardController(model);

    expect(model.hud_board[0][0].value).toEqual(0)

    controller.select(0,0)
    expect(model.hud_board[0][0].value).toEqual(1)
    
    controller.select(1,0)
    expect(model.hud_board[0][0].value).toEqual(0)
    expect(model.hud_board[1][0].value).toEqual(1)
  })

  it('moves actor', async () => {
    const model = new BoardModel()
    const controller = new BoardController(model);

    expect(model.actors_board[1][1].value).toEqual(1)

    controller.select(1,1)
    controller.select(1,2)
    expect(model.actors_board[1][1].value).toEqual(0)
    expect(model.actors_board[1][2].value).toEqual(1)
    expect(model.hud_board[1][2].value).toEqual(0)

    controller.select(1,1)//nao deve mover sem selecionar novamente
    expect(model.actors_board[1][1].value).toEqual(0)
    expect(model.actors_board[1][2].value).toEqual(1)
    expect(model.hud_board[1][1].value).toEqual(1)
  })

  it('shows possible moves', async () => {
    const model = new BoardModel("dev1")
    const controller = new BoardController(model);
    const neighbors = controller.getNeighbors(1,1,2)
    console.log(neighbors);
    expect(neighbors.length).toEqual(4)
  })
})
