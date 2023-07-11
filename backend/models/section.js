const { Coordinate } = require('./coordinate')
const { CoordinateMap } = require('./coordinateMap')
const { Offset } = require('./offset')
const { Tile, TileType } = require('./tile')
const { Wall } = require('./wall')
const { Portal } = require('./portal')


//deals with simple coordinates
class Section {
    constructor(id, dimensions, offset, direction) {
        this.id = id
        this.dimensions = dimensions
        this.offset = offset
        this.direction = direction

        this.connections = []
        this.escalators = []
        this.walls = []

        this.tiles = new CoordinateMap()
        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                this.addTile(new Tile(new Coordinate(i, j), TileType.NORMAL, null))
            }
        }
    }

    addEscalator(escalator) {
        this.escalators.push(escalator)
    }

    getGlobalCoord(coord, originCoordinate) {
        return coord.offset(this.offset).relativeTo(originCoordinate)
    }

    getEscalatorData(relativeTo) {
        let escalatorData = []
        this.escalators.forEach( (escalator, index) =>  {
            let data = {
                id: `${this.id}-${index}`,
                start: this.getGlobalCoord(escalator.startCoord, relativeTo),
                end:  this.getGlobalCoord(escalator.endCoord, relativeTo)
            }
            escalatorData.push(data)
        }
        )
        return escalatorData
    }

    addConnection(connection) {
        this.connections.push(connection)
        this.addTile(new Tile(connection.coord, TileType.CONNECT, connection.type))
    }

    addTile(tile) {
        this.tiles.addItem(tile.coord, tile)
    }

    addWallTile(coord) {
        const tile = new Tile(coord, TileType.WALL, null)
        this.tiles.addItem(coord, tile)
    }

    addWall(from, to) {
        const wall = new Wall(from, to)
        this.walls.push(wall)
    }

    getWallData(relativeTo) {
        let wallData = []
        this.walls.forEach( wall =>  {
            let data = {
                start: this.getGlobalCoord(wall.startCoord, relativeTo),
                end:  this.getGlobalCoord(wall.endCoord, relativeTo)
            }
            wallData.push(data)
        }
        )
        return wallData
    }

    getTilesOfType(type, relativeTo) {
        return this.tiles.getItems()
            .filter( tile => tile.type === type)
            .map( tile => this.getAbsolutePos(tile.coord, relativeTo))
    }

    getPortals(relativeTo) {
        return this.tiles.getItems()
            .filter( tile => tile.type === TileType.PORTAL)
            .map( tile => new Portal(this.getAbsolutePos(tile.coord, relativeTo), tile.tokenType))
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

    getNormalTiles(relativeTo) {
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

    allItemsCollected() {
        return !this.tiles.hasItemMatching( tile => tile.hasNeededItem())
    }

    inBounds(coord) {
        const relativeCoord = this.getRelativeCoord(coord)
        return this.tiles.hasItemAt(relativeCoord)
    }

    getAbsolutePos(coord, relativeTo) {
        return coord.offset(this.offset).relativeTo(relativeTo)
    }

    getRelativeCoord(coord) {
        return coord.relativeTo(this.offset)
    }

    canMoveV2(originalCoord, updatedCoord) {
        if(!this.inBounds(updatedCoord)) {
            return false
        }
        const nextTile = this.getTile(updatedCoord)
        const blocked = this.walls.some( wall => wall.isBetween(this.getRelativeCoord(originalCoord), this.getRelativeCoord(updatedCoord)))

        return nextTile.isPassable() && !blocked
    }

    escalate(token, escalatorIndex){
        const escalator = this.escalators[Number(escalatorIndex)]
        const otherEnd = escalator.getOtherEnd(this.getRelativeCoord(token.coordinate))
        if(!otherEnd) {
            return token.coordinate
        }
        return otherEnd.offset(this.offset)
    }

    isAtSectionCoord(coord, sectionCoord) {
        let relativeCoord = this.getRelativeCoord(coord)
        return sectionCoord.x === relativeCoord.x && sectionCoord.y === relativeCoord.y
    }

    getConnectingOffset(coord) {
        const connection = this.connections.find( connection => this.isAtSectionCoord(coord, connection.coord))
        if(!connection) {
            return [null, null]
        }
        let connectingOriginCoord = connection.getConnectionOrigin().offset(this.offset)
        return [new Offset(connectingOriginCoord.x, connectingOriginCoord.y), connection.orientation]
    }

    connectAt(coord) {
        const connection = this.connections.find( connection => this.isAtSectionCoord(coord, connection.coord))
        if(!connection) {
            return
        }
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