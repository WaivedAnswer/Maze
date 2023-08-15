const splitMoves = (movements, playerCount) => {
    if (playerCount === 0 || movements.length === 0) {
        return []
    }

    const playerMoves = new Array(playerCount).fill(0).map(() => [])

    while (movements.length > 0) {
        const randomPlayerIdx = Math.floor(Math.random() * playerCount)
        const randomMoveIdx = Math.floor(Math.random() * movements.length)

        // Assign the randomly selected move to the randomly selected player
        playerMoves[randomPlayerIdx].push(movements[randomMoveIdx])

        // Remove the assigned move from the movements array
        movements.splice(randomMoveIdx, 1)
    }

    return playerMoves
}

module.exports = {
    splitMoves
}