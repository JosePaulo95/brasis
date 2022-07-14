
import { TicTacStateModel } from '@/TicTac/models/TicTacStateModel'
import TicTacController from "@/TicTac/controllers/TicTacController"

describe('it finds the neighbors states', () => {
  it('tictactoe - initial states', () => {
    const initial_state = new TicTacStateModel()
    const controller = new TicTacController()
    const possible_moves = controller.getPossibleMoves(initial_state)
    //console.log(possible_moves.map(s=>s.next_player+"\n"+s.board.map(row => row.join(",")).join("\n")).join("\n\n"))
    expect(possible_moves.length).toEqual(9)
    //expect(new Set(possible_moves.map(s=>s.next_player)).size).toEqual(1)
  })
})