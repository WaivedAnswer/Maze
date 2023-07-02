const { Coordinate } = require('./coordinate')
const { DIRECTIONS, getNextDirection, getPrevDirection, getOppositeDirection } = require('./direction')

function getRotatedCoord(direction, coord, dimensions) {
    switch(direction) {
    case DIRECTIONS.UP:
        return coord
    case DIRECTIONS.DOWN:
        return new Coordinate(dimensions - coord.x - 1, dimensions - coord.y - 1)
    case DIRECTIONS.LEFT:
        return new Coordinate(coord.y, dimensions - coord.x - 1)
    case DIRECTIONS.RIGHT:
        return new Coordinate(dimensions - coord.y - 1, coord.x)
    }
}

function getRotatedWallCoord(direction, coord, dimensions) {
    switch(direction) {
    case DIRECTIONS.UP:
        return coord
    case DIRECTIONS.DOWN:
        return new Coordinate(dimensions - coord.x, dimensions - coord.y)
    case DIRECTIONS.LEFT:
        return new Coordinate(coord.y, dimensions - coord.x)
    case DIRECTIONS.RIGHT:
        return new Coordinate(dimensions - coord.y, coord.x)
    }
}

function getRotatedDirection(direction, originalDirection) {
    switch(direction) {
    case DIRECTIONS.UP:
        return originalDirection
    case DIRECTIONS.DOWN:
        return getOppositeDirection(originalDirection)
    case DIRECTIONS.LEFT:
        return getPrevDirection(originalDirection)
    case DIRECTIONS.RIGHT:
        return getNextDirection(originalDirection)
    default:
        throw new Error('Unknown Direction!' + JSON.stringify(direction) + JSON.stringify(originalDirection))
    }
}


module.exports = {
    getRotatedCoord,
    getRotatedWallCoord,
    getRotatedDirection
}