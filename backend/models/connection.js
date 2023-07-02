const { Coordinate } = require('./coordinate')
const { DIRECTIONS, getOppositeDirection } = require('./direction')

class Connection {
    constructor(orientation, coord, dimensions) {
        this.orientation = orientation
        this.coord = coord
        this.dimensions = dimensions
    }

    getConnectionOrigin() {
        const adjacentPointToConnection = this.coord.offset(this.orientation)
        const oppositeOrientation = getOppositeDirection(this.orientation)
        const oppositeConnectionPoint = getConnectionCoordinate(oppositeOrientation, this.dimensions)

        return adjacentPointToConnection.relativeTo(oppositeConnectionPoint)
    }
}

function getConnection(orientation, dimensions) {
    const centre = Math.floor(dimensions / 2)
    const start = 0
    const end = dimensions - 1
    const oppositeCentre = end - centre

    switch (orientation) {
    case DIRECTIONS.UP:
        return new Connection(orientation, new Coordinate(centre, start), dimensions)
    case DIRECTIONS.RIGHT:
        return new Connection(orientation, new Coordinate(end, centre), dimensions)
    case DIRECTIONS.DOWN:
        return new Connection(orientation, new Coordinate(oppositeCentre, end), dimensions)
    case DIRECTIONS.LEFT:
        return new Connection(orientation, new Coordinate(start, oppositeCentre), dimensions)
    }
}

function getConnectionCoordinate(orientation, dimensions) {
    const centre = Math.floor(dimensions / 2)
    const start = 0
    const end = dimensions - 1
    const oppositeCentre = end - centre

    switch (orientation) {
    case DIRECTIONS.UP:
        return new Coordinate(centre, start)
    case DIRECTIONS.RIGHT:
        return new Coordinate(end, centre)
    case DIRECTIONS.DOWN:
        return new Coordinate(oppositeCentre, end)
    case DIRECTIONS.LEFT:
        return new Coordinate(start, oppositeCentre)
    }
}

module.exports = {
    Connection,
    getConnection,
    getConnectionCoordinate
}