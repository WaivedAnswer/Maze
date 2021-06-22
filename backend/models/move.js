const splitMoves = (movements, playerCount) => {
    if (playerCount === 0) {
        return []
    }
    const playerMoves = new Array(playerCount).fill(0).map(() => [])
    for (let idx in movements) {
        playerMoves[idx % playerCount].push(movements[idx])
    }
    return playerMoves
}

module.exports = {
    splitMoves
}