const splitMoves = (movements, playerCount) => {
    if (playerCount === 0 || movements.length === 0) {
        return []
    }

    const playerMoves = new Array(playerCount).fill(0).map(() => [])

    const randomStartingPlayerIdx = Math.floor(Math.random() * playerCount)
    let playerIdx = randomStartingPlayerIdx
    while (movements.length > 0) {
        const randomMoveIdx = Math.floor(Math.random() * movements.length)

        // Assign the randomly selected move to the next Player
        playerMoves[playerIdx].push(movements[randomMoveIdx])
        // Remove the assigned move from the movements array
        movements.splice(randomMoveIdx, 1)

        playerIdx = (playerIdx + 1) % playerCount
    }

    return playerMoves
}

module.exports = {
    splitMoves
}