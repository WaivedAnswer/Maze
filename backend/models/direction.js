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

function getOppositeDirection(orientation) {
    switch (orientation) {
    case DIRECTIONS.RIGHT:
        return DIRECTIONS.LEFT
    case DIRECTIONS.LEFT:
        return DIRECTIONS.RIGHT
    case DIRECTIONS.UP:
        return DIRECTIONS.DOWN
    case DIRECTIONS.DOWN:
        return DIRECTIONS.UP
    }
}


module.exports = {
    DIRECTIONS,
    getOppositeDirection
}
