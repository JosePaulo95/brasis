
export const PLAYER_UNIT = "A"
export const ENEMY_UNIT = "E"

export const deduceState = (board) => {
    if(countUnits(board, PLAYER_UNIT) == 0 && countUnits(board, ENEMY_UNIT) == 0){
        return "empty";
    }
    if(countUnits(board, PLAYER_UNIT) > 0 && countUnits(board, ENEMY_UNIT) == 0){
        return "player_victory";
    }
    if(countUnits(board, PLAYER_UNIT) == 0 && countUnits(board, ENEMY_UNIT) > 0){
        return "enemy_victory";
    }
    if(countUnits(board, PLAYER_UNIT) > 0 && countUnits(board, ENEMY_UNIT) > 0){
        return "disputing";
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