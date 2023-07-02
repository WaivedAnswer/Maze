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
    const nextIndex = (directionIndex + 1) % DIRECTION_ORDER.length
    return DIRECTION_ORDER[nextIndex]
}

function getPrevDirection(direction) {
    const directionIndex = DIRECTION_ORDER.indexOf(direction)
    const nextIndex = directionIndex - 1
    if(nextIndex >= 0) {
        return DIRECTION_ORDER[nextIndex]
    } else {
        return DIRECTION_ORDER[(DIRECTION_ORDER.length - 1)]
    }
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
    default:
        throw new Error('Invalid orientation' + JSON.stringify(orientation))
    }
}


module.exports = {
    DIRECTIONS,
    getOppositeDirection,
    getNextDirection,
    getPrevDirection
}
