const { Coordinate } = require('./coordinate')
const { Offset } = require('./offset')
const { Tile } = require('./tile')

//deals with simple coordinates
class Section {
    constructor(dimensions, offset, hidden, exit) {
        this.dimensions = dimensions
        this.hidden = hidden
        this.originalHidden = hidden
        this.offset = offset
        this.exit = exit
        this.walls = new Map()

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

    reset() {
        this.hidden = this.originalHidden
        console.log(this.originalHidden)
    }

    getWalls() {
        return [...this.walls.values()].map(tile => tile.coord.offset(this.offset).getPos())
    }

    getExits() {
        if (!this.exit) {
            return []
        }
        return [this.exit.offset(this.offset).getPos()]
    }

    getAllTiles() {
        let allTiles = []
        let origin = new Coordinate(this.offset.x, this.offset.y)
        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                allTiles.push(origin.offset(new Offset(i, j)).getPos())
            }
        }
        return allTiles
    }

    getMaxDimensions() {
        return {
            width: this.offset.x + this.dimensions,
            height: this.offset.y + this.dimensions
        }
    }

    addTile(tile) {
        this.walls.set(tile.coord.getKey(), tile)
    }

    inBounds(selected) {
        return selected >= 0 && selected < this.dimensions
    }

    canMove(coord) {
        let relativeCoord = coord.relativeTo(this.offset)
        let key = relativeCoord.getKey()
        let isWall = this.walls.has(key)

        return this.inBounds(relativeCoord.x) && this.inBounds(relativeCoord.y) && !isWall
    }

    isAtExit(coord) {
        if (!this.exit) {
            return false
        }
        return coord.x === this.exit.offset(this.offset).x && coord.y === this.exit.offset(this.offset).y
    }
}

module.exports = {
    Section
}