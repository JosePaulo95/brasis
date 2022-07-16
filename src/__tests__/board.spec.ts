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

    expect(model.actors_board[1][1]).toEqual(1)

    controller.select(1,1)
    controller.select(1,2)
    expect(model.actors_board[1][1]).toEqual(0)
    expect(model.actors_board[1][2]).toEqual(1)
    expect(model.hud_board[1][2]).toEqual(0)

    controller.select(1,1)//nao deve mover sem selecionar novamente
    expect(model.actors_board[1][1]).toEqual(0)
    expect(model.actors_board[1][2]).toEqual(1)
    expect(model.hud_board[1][1]).toEqual(1)
  })
})
