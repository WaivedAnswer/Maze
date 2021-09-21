const { Coordinate } = require('./coordinate')
const { CoordinateMap } = require('./coordinateMap')
const { Offset } = require('./offset')
const { Tile } = require('./tile')
const { getConnection } = require('./connection')
const { DIRECTIONS } = require('./direction')

//deals with simple coordinates
class Section {
    constructor(dimensions, offset, exit) {
        this.dimensions = dimensions
        this.offset = offset
        this.tiles = new CoordinateMap()
        if(exit) {
            this.tiles.addItem(exit, new Tile(exit))
        }
        this.walls = new Map()
        this.connections = [
            getConnection(DIRECTIONS.UP),
            getConnection(DIRECTIONS.RIGHT)
        ]

        for (let i = 0; i < dimensions - 1; i++) {
            this.addTile(new Tile(new Coordinate(i, 5)))
        }

        for (let i = 0; i < 4; i++) {
            this.addTile(new Tile(new Coordinate(i, 1)))
        }

        for (let i = 1; i < 6; i++) {
            this.addTile(new Tile(new Coordinate(i, 7)))
        }

        for (let i = 1; i < 6; i++) {
            this.addTile(new Tile(new Coordinate(i, 3)))
        }

        for (let j = 0; j < 3; j++) {
            this.addTile(new Tile(new Coordinate(5, j)))
        }

        for (let j = 7; j < dimensions; j++) {
            this.addTile(new Tile(new Coordinate(6, j)))
        }

        for (let j = 1; j < dimensions - 1; j++) {
            this.addTile(new Tile(new Coordinate(8, j)))
        }
    }

    getAbsolutePos(coord, relativeTo) {
        return coord.offset(this.offset).relativeTo(relativeTo).getPos()
    }


    getWalls(relativeTo) {
        return [...this.walls.values()].map(tile => this.getAbsolutePos(tile.coord, relativeTo))
    }

    getExitTiles() {
        return this.tiles.getItems()
    }

    getExits(relativeTo) {
        const exits = this.getExitTiles()
        if (exits.length === 0) {
            return []
        }

        return exits.map(exit => this.getAbsolutePos(exit.coord, relativeTo))
    }

    getAllTiles(relativeTo) {
        let allTiles = []
        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                allTiles.push(this.getAbsolutePos(new Coordinate(i, j), relativeTo))
            }
        }
        return allTiles
    }

    getMaxDimensions(relativeTo) {
        return {
            width: this.offset.x + this.dimensions - relativeTo.x,
            height: this.offset.y + this.dimensions - relativeTo.y
        }
    }

    addTile(tile) {
        this.walls.set(tile.coord.getKey(), tile)
    }

    inBounds(selected) {
        return selected >= 0 && selected < this.dimensions
    }

    getRelativeCoord(coord) {
        return coord.relativeTo(this.offset)
    }

    canMove(coord) {
        let relativeCoord = this.getRelativeCoord(coord)
        let key = relativeCoord.getKey()
        let isWall = this.walls.has(key)

        return this.inBounds(relativeCoord.x) && this.inBounds(relativeCoord.y) && !isWall
    }

    isAtSectionCoord(coord, sectionCoord) {
        let relativeCoord = this.getRelativeCoord(coord)
        return sectionCoord.x === relativeCoord.x && sectionCoord.y === relativeCoord.y
    }

    getConnectingOffset(coord) {
        const connection = this.connections.find( connection => this.isAtSectionCoord(coord, connection.coord))
        if(!connection || connection.connected) {
            return null
        }
        let connectingOriginCoord = connection.getConnectionOrigin().offset(this.offset)
        return new Offset(connectingOriginCoord.x, connectingOriginCoord.y)
    }

    connectAt(coord) {
        const connection = this.connections.find( connection => this.isAtSectionCoord(coord, connection.coord))
        if(!connection) {
            return
        }
        connection.connected = true
    }

    isAtExit(coord) {
        const exits = this.getExitTiles()
        if (exits.length === 0 ) {
            return false
        }
        return exits.some( exit => this.isAtSectionCoord(coord, exit.coord))
    }
}

module.exports = {
    Section
}