const { Coordinate } = require('./coordinate')
const { Tile } = require('./tile')

class Board {
    constructor(dimensions, exit) {
        this.dimensions = dimensions
        this.exit = exit
        this.tiles = new Map()

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

    getData() {

        return {
            height: this.dimensions,
            width: this.dimensions,
            exit: this.exit.getPos(),
            walls: [...this.tiles.values()].map(tile => tile.coord.getPos())
        }
    }

    addTile(tile) {
        this.tiles.set(tile.coord.getKey(), tile)
    }

    inBounds(selected) {
        return selected >= 0 && selected < this.dimensions
    }

    canMove(coord) {
        let key = coord.getKey()
        console.log(key)
        let isWall = this.tiles.has(key)
        console.log(isWall)
        console.log(this.tiles)
        return this.inBounds(coord.x) && this.inBounds(coord.y) && !isWall
    }

    isAtExit(pos) {
        return pos.x === this.exit.x && pos.y === this.exit.y
    }
}

module.exports = {
    Board
}