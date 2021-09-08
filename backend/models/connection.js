const { Coordinate } = require('./coordinate')
const { DIRECTIONS, getOppositeDirection } = require('./direction')

class Connection {
    constructor(orientation, coord) {
        this.orientation = orientation
        this.coord = coord
        this.connected = false
    }

    getConnectionOrigin() {
        const adjacentPointToConnection = this.coord.offset(this.orientation)
        const oppositeOrientation = getOppositeDirection(this.orientation)
        const oppositeConnectionPoint = getConnection(oppositeOrientation)

        return adjacentPointToConnection.relativeTo(oppositeConnectionPoint.coord)
    }
}

function getConnection(orientation) {
    switch (orientation) {
    case DIRECTIONS.UP:
        return new Connection(orientation, new Coordinate(2, 0))
    case DIRECTIONS.RIGHT:
        return new Connection(orientation, new Coordinate(9, 5))
    case DIRECTIONS.DOWN:
        return new Connection(orientation, new Coordinate(3, 9))
    case DIRECTIONS.LEFT:
        return new Connection(orientation, new Coordinate(0, 4))
    }
}

module.exports = {
    Connection,
    getConnection
}