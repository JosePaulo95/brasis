
const PLAYER_UNIT = "A"
const ENEMY_UNIT = "E"

export const deduceState = (board) => {
    if(countUnits(board, PLAYER_UNIT) == 0 && countUnits(board, ENEMY_UNIT) == 0){
        return "empty";
    }
    return "?";
}

const countUnits = (board, unit_type) => {
    let count = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(board[i][j] == unit_type)
                count++
        }
    }
    return count
}