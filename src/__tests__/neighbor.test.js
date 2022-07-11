import { assert, describe, expect, it } from 'vitest'
import { findNeighbors } from "../common/GameState"
import { TicTacController } from "../controllers/TicTacController"
import { TicTacStateModel } from "../models/TicTacStateModel"

describe('it finds the neighbors states', () => {
  it('tictactoe - initial states', () => {
    const initial_state = new TicTacStateModel()
    const neighbors = findNeighbors(TicTacController, initial_state)
    console.log(neighbors.map(s=>s.next_player+"\n"+s.board.map(row => row.join(",")).join("\n")).join("\n\n"))
    expect(neighbors.length).toEqual(9)
    expect(new Set(neighbors.map(s=>s.next_player)).size).toEqual(1)
  })
})