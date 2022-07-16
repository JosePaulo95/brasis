import BoardController from '@/Brasis/controllers/board'
import BoardModel from '@/Brasis/models/board'
import Board from '@/components/Board.vue'

describe('board component', () => {
  it('selects cells', async () => {
    const model = new BoardModel()
    const controller = new BoardController(model);
    let state = {}

    expect(model.hud_board[0][0]).toEqual(0)

    state = controller.select(0,0)
    expect(model.hud_board[0][0]).toEqual(1)
    
    state = controller.select(1,0)
    expect(model.hud_board[0][0]).toEqual(0)
    expect(model.hud_board[1][0]).toEqual(1)
  })
})
