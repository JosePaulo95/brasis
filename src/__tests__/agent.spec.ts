
import { TicTacStateModel } from '../TicTac/models/TicTacStateModel'
import { assert, describe, expect, it } from 'vitest'
import TicTacController from "../TicTac/controllers/TicTacController"
import { X,O,_ } from '../TicTac/models/TicTacPieceModel'

describe('agent', () => {
  it('deduces terminal nodes', ()=>{
    const draw = [
      [X,O,X],
      [O,X,O],
      [O,X,O]
    ]
    const x_vic = [
      [X,X,X],
      [X,_,O],
      [O,_,O]
    ]
    const o_vic = [
      [O,X,X],
      [X,O,O],
      [O,_,O]
    ]
    const going = [
      [O,X,X],
      [X,_,_],
      [O,_,O]
    ]
    const controller = new TicTacController()
    expect(controller.eval(draw)).toEqual("0")
    expect(controller.eval(x_vic)).toEqual("1")
    expect(controller.eval(o_vic)).toEqual("-1")
    expect(controller.eval(going)).toEqual("?")
  })
  it('resolves tictactoe', () => {
    //cria um state
    //lista de moves avaliadas

    const initial_state = new TicTacStateModel([
      [X, O, O],
      [O, _, X],
      [_, _, _]], O
    )
    const controller = new TicTacController()
    const evaluated_moves = controller.getPossibleMovesEvaluation(initial_state)
    console.log(evaluated_moves.map(s=>s.eval+"\n"+s.state.board.map(row => row.join(",")).join("\n")).join("\n\n"))
    expect(evaluated_moves.length).toEqual(4)
  })
})