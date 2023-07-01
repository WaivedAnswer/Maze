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

const DIRECTION_ORDER = [
    DIRECTIONS.UP,
    DIRECTIONS.RIGHT,
    DIRECTIONS.DOWN,
    DIRECTIONS.LEFT
]

function getNextDirection(direction) {
    const directionIndex = DIRECTION_ORDER.indexOf(direction)
    return DIRECTION_ORDER[(directionIndex + 1) % DIRECTION_ORDER.length]
}

function getPrevDirection(direction) {
    const directionIndex = DIRECTION_ORDER.indexOf(direction)
    return DIRECTION_ORDER[(directionIndex - 1) % DIRECTION_ORDER.length]
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
    getOppositeDirection,
    getNextDirection,
    getPrevDirection
}
