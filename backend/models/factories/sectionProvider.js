const { Section } = require('../section')
const { Tile, TileType } = require('../tile')
const { Coordinate } = require('../coordinate')
const { Escalator } = require('../escalator')
const { Item, ItemType } = require('../item')
const { getConnection } = require('../connection')
const { DIRECTIONS } = require('../direction')
class BasicSectionProvider {

    constructor() {
        this.sectionDimensions = 10
        this.sectionCount = 3
        this.remaining = this.sectionCount
    }

    createSection(id, offset) {
        const isLast = (id + 1) >= this.sectionCount
        const section = new Section(id, this.sectionDimensions,
            offset)



        this.addWalls(section)
        //this.addWallTiles(section)


        section.addTile(new Tile(new Coordinate(3,0), TileType.NORMAL, new Item(ItemType.COIN)))
        section.addTile(new Tile(new Coordinate(6,0), TileType.NORMAL, new Item(ItemType.TIMER)))
        section.addTile(new Tile(new Coordinate(7,4), TileType.PORTAL))
        section.addEscalator(new Escalator(new Coordinate(6, 3), new Coordinate(9, 2)))

        section.addConnection(getConnection(DIRECTIONS.DOWN, this.sectionDimensions))
        if(!isLast) {
            section.addConnection(getConnection(DIRECTIONS.RIGHT, this.sectionDimensions))
        } else {
            const connection = getConnection(DIRECTIONS.RIGHT, this.sectionDimensions)
            section.addTile(new Tile(connection.coord, TileType.EXIT))
        }


        this.remaining -= 1

        return section
    }

    getInitialTokenCoordinates() {
        return [new Coordinate(0, 0), new Coordinate(this.sectionDimensions - 1, this.sectionDimensions - 1)]
    }

    addWalls(section) {
        section.addWall(new Coordinate(0, 0), new Coordinate(4, 0))
        section.addWall(new Coordinate(5, 0), new Coordinate(10, 0))
        section.addWall(new Coordinate(10, 0), new Coordinate(10, 4))
        section.addWall(new Coordinate(10, 5), new Coordinate(10, 10))

        section.addWall(new Coordinate(0, 0), new Coordinate(0, 5))
        section.addWall(new Coordinate(0, 6), new Coordinate(0, 10))
        section.addWall(new Coordinate(0, 10), new Coordinate(5, 10))
        section.addWall(new Coordinate(6, 10), new Coordinate(10, 10))

        section.addWall(new Coordinate(0, 5), new Coordinate(this.sectionDimensions - 2, 5))

        section.addWall(new Coordinate(0, 1), new Coordinate(4, 1))

        section.addWall(new Coordinate(1, 7), new Coordinate(6, 7))

        section.addWall(new Coordinate(1, 3), new Coordinate(6, 3))

        section.addWall(new Coordinate(6, 0), new Coordinate(6, 3))

        section.addWall(new Coordinate(6, 7), new Coordinate(6, this.sectionDimensions))

        section.addWall(new Coordinate(8, 1), new Coordinate(8, this.sectionDimensions - 1))

    }

    addWallTiles(section) {
        for (let i = 0; i < this.sectionDimensions - 1; i++) {
            section.addWallTile(new Coordinate(i, 5))
        }

        for (let i = 0; i < 4; i++) {
            section.addWallTile(new Coordinate(i, 1))
        }

        for (let i = 1; i < 6; i++) {
            section.addWallTile(new Coordinate(i, 7))
        }

        for (let i = 1; i < 6; i++) {
            section.addWallTile(new Coordinate(i, 3))
        }

        for (let j = 0; j < 3; j++) {
            section.addWallTile(new Coordinate(5, j))
        }

        for (let j = 7; j < this.sectionDimensions; j++) {
            section.addWallTile(new Coordinate(6, j))
        }

        for (let j = 1; j < this.sectionDimensions - 1; j++) {
            section.addWallTile(new Coordinate(8, j))
        }
    }
}

module.exports = {
    BasicSectionProvider
}
