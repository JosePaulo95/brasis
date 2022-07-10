import { assert, describe, expect, it } from 'vitest'
import { deduceState, PLAYER_UNIT as P, ENEMY_UNIT as E } from '../services/GameState'


describe('gamestate', () => {
  it('recognizes empty board', () => {
    const empty_board = [[0,0], [0,0]]
    expect(deduceState(empty_board)).toEqual("empty")

    const empty_board_1 = [[1,1], [0,1]]
    expect(deduceState(empty_board_1)).toEqual("empty")
  })

  it('recognizes player victory', () => {
    const only_player_board = [[0,P], [0,0]]
    expect(deduceState(only_player_board)).toEqual("player_victory")

    const only_player_board_1 = [[0,1], [P,P]]
    expect(deduceState(only_player_board_1)).toEqual("player_victory")
  })

  it('recognizes enemy victory', () => {
    const only_player_board = [[0,E], [0,0]]
    expect(deduceState(only_player_board)).toEqual("enemy_victory")

    const only_player_board_1 = [[E,E], [0,1]]
    expect(deduceState(only_player_board_1)).toEqual("enemy_victory")
  })

  it('recognizes disputing', () => {
    const only_player_board = [[0,E], [P,1]]
    expect(deduceState(only_player_board)).toEqual("disputing")

    const only_player_board_1 = [[E,P], [0,0]]
    expect(deduceState(only_player_board)).toEqual("disputing")
  })
})