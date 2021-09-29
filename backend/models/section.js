const { Coordinate } = require('./coordinate')
const { CoordinateMap } = require('./coordinateMap')
const { Offset } = require('./offset')
const { Tile, TileType } = require('./tile')
const { getConnection } = require('./connection')
const { DIRECTIONS } = require('./direction')

//deals with simple coordinates
class Section {
    constructor(dimensions, offset) {
        this.dimensions = dimensions
        this.offset = offset

        this.connections = [
            getConnection(DIRECTIONS.UP),
            getConnection(DIRECTIONS.RIGHT)
        ]

        this.tiles = new CoordinateMap()
        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                this.addTile(new Tile(new Coordinate(i, j), TileType.NORMAL))
            }
        }
    }

    addTile(tile) {
        this.tiles.addItem(tile.coord, tile)
    }

    addWall(coord) {
        const tile = new Tile(coord, TileType.WALL)
        this.tiles.addItem(coord, tile)
    }

    getTilesOfType(type, relativeTo) {
        return this.tiles.getItems()
            .filter( tile => tile.type === type)
            .map( tile => this.getAbsolutePos(tile.coord, relativeTo))
    }

    getExitTiles() {
        return this.tiles.getItems().filter( tile => tile.type === TileType.EXIT)
    }

    getWalls(relativeTo) {
        return this.getTilesOfType(TileType.WALL, relativeTo)
    }

    getExits(relativeTo) {
        return this.getTilesOfType(TileType.EXIT, relativeTo)
    }

    getAllTiles(relativeTo) {
        return this.getTilesOfType(TileType.NORMAL, relativeTo)
    }

    getTile(coord) {
        const relativeCoord = this.getRelativeCoord(coord)
        return this.tiles.getItemAt(relativeCoord)
    }

    getMaxDimensions(relativeTo) {
        return {
            width: this.offset.x + this.dimensions - relativeTo.x,
            height: this.offset.y + this.dimensions - relativeTo.y
        }
    }

    inBounds(coordDimension) {
        return coordDimension >= 0 && coordDimension < this.dimensions
    }

    getAbsolutePos(coord, relativeTo) {
        return coord.offset(this.offset).relativeTo(relativeTo).getPos()
    }

    getRelativeCoord(coord) {
        return coord.relativeTo(this.offset)
    }

    canMove(coord) {
        const relativeCoord = this.getRelativeCoord(coord)
        if(!this.inBounds(relativeCoord.x) || !this.inBounds(relativeCoord.y)) {
            return false
        }
        const currTile = this.getTile(coord)
        return currTile.isPassable()
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
        let relativeCoord = this.getRelativeCoord(coord)
        const currTile = this.tiles.getItemAt(relativeCoord)
        return currTile.type === TileType.EXIT
    }
}

module.exports = {
    Section
}