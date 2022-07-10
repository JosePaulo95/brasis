import { assert, describe, expect, it } from 'vitest'
import { deduceState } from '../services/GameState'


describe('gamestate', () => {
  it('recognizes pure states', () => {
    const empty_board = [[0,0], [0,0]]
    expect(deduceState(empty_board)).toEqual("empty")
  })
})