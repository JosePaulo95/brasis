
export const readState = (GameController, board) => {
    const controller = new GameController()
    return controller.deduceState(board)
}

export const findNeighbors = (GameController, state) => {
    const controller = new GameController()
    return controller.deduceNeighbors(state)
}