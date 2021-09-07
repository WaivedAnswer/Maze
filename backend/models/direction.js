const getMovementVector = (x, y) => {
    return {
        x: x,
        y: y
    }
}

const DIRECTIONS = {
    RIGHT: getMovementVector(1, 0),
    LEFT: getMovementVector(-1, 0),
    UP: getMovementVector(0, -1),
    DOWN: getMovementVector(0, 1)
}


module.exports = {
    DIRECTIONS
}
