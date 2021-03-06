//import { PLAYER_UNIT as P, ENEMY_UNIT as E } from '../models/brasisModel'
import TicTacController from '@/TicTac/controllers/TicTacController'
import { _ } from '@/TicTac/models/TicTacPieceModel'
//import { BrasisController, TicTacController } from '../controllers'
import { phases } from '@/common/Phases'

describe('recognizes gamestate', () => {
  // it('brasis - empty board', () => {
  //   const empty_board = [[_,_], [_,_]]
  //   expect(readState(BrasisController, empty_board)).toEqual(states.EMPTY)

  //   const empty_board_1 = [[1,1], [0,1]]//paredes
  //   expect(readState(BrasisController, empty_board_1)).toEqual(states.EMPTY)
  // })

  it('tictactoe - empty board', () => {
    const empty_board = [[_,_,_], [_,_,_], [_,_,_]]
    const controller = new TicTacController()
    expect(controller.readPhase(empty_board)).toEqual(phases.EMPTY)
  })

  // it('player victory', () => {
  //   const only_player_board = [[0,P], [0,0]]
  //   expect(readState(only_player_board)).toEqual("player_victory")

  //   const only_player_board_1 = [[0,1], [P,P]]
  //   expect(readState(only_player_board_1)).toEqual("player_victory")
  // })

  // it('enemy victory', () => {
  //   const only_player_board = [[0,E], [0,0]]
  //   expect(readState(only_player_board)).toEqual("enemy_victory")

  //   const only_player_board_1 = [[E,E], [0,1]]
  //   expect(readState(only_player_board_1)).toEqual("enemy_victory")
  // })

  // it('disputing', () => {
  //   const only_player_board = [[0,E], [P,1]]
  //   expect(readState(only_player_board)).toEqual("disputing")

  //   const only_player_board_1 = [[E,P], [0,0]]
  //   expect(readState(only_player_board_1)).toEqual("disputing")
  // })
})