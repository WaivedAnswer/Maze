const { Section } = require('./section')
const { Offset } = require('./offset')
const { Tile, TileType } = require('./tile')
const { Coordinate } = require('./coordinate')
const { DIRECTIONS } = require('./direction')
const { Item } = require('./item')

//deals with section coordinates and section connections
class Board {
    constructor(dimensions, onBoardChange) {
        this.sectionCount = 3
        this.sectionDimensions = dimensions
        this.sections = [
            this.createSection(new Offset(0, 0), null)
        ]
        this.onBoardChange = onBoardChange
    }

    createSection(offset, exit) {
        const section = new Section(this.sectionDimensions,
            offset)
        if(exit) {
            section.addTile(new Tile(exit, TileType.EXIT))
        }

        for (let i = 0; i < this.sectionDimensions - 1; i++) {
            section.addWall(new Coordinate(i, 5))
        }

        for (let i = 0; i < 4; i++) {
            section.addWall(new Coordinate(i, 1))
        }

        for (let i = 1; i < 6; i++) {
            section.addWall(new Coordinate(i, 7))
        }

        for (let i = 1; i < 6; i++) {
            section.addWall(new Coordinate(i, 3))
        }

        for (let j = 0; j < 3; j++) {
            section.addWall(new Coordinate(5, j))
        }

        for (let j = 7; j < this.sectionDimensions; j++) {
            section.addWall(new Coordinate(6, j))
        }

        for (let j = 1; j < this.sectionDimensions - 1; j++) {
            section.addWall(new Coordinate(8, j))
        }

        section.addTile(new Tile(new Coordinate(4,0), TileType.NORMAL, new Item()))

        return section
    }

    getMinCoordinate() {
        const offsetX = this.sections.map(section => section.offset.x)
        const minOffsetX = Math.min(...offsetX)
        const offsetY = this.sections.map( section => section.offset.y)
        const minOffsetY = Math.min(...offsetY)
        return new Coordinate(minOffsetX, minOffsetY)
    }

    getMaxCoordinate() {
        const height = Math.max(...this.sections.map(section => section.getMaxDimensions(this.getMinCoordinate()).height))
        const width =  Math.max(...this.sections.map(section => section.getMaxDimensions(this.getMinCoordinate()).width))
        return new Coordinate(width, height)
    }

    getData() {
        return {
            tiles: this.getAllData()
        }
    }

    getAllData() {
        let minCoordinate = this.getMinCoordinate()
        let maxCoordinate = this.getMaxCoordinate()
        const allTiles = []
        for (let y = minCoordinate.y; y < maxCoordinate.y; y++) {
            let row = []
            for (let x = minCoordinate.x; x < maxCoordinate.x; x++) {
                const currCoord = new Coordinate(x, y)
                const currTile = this.getTile(currCoord)
                const originBasedCoord = currCoord.relativeTo(minCoordinate)
                if(currTile) {
                    row.push({
                        pos: originBasedCoord.getPos(),
                        type: currTile.type,
                        // eslint-disable-next-line eqeqeq
                        hasItem: currTile.item != null
                    })
                } else {
                    row.push({
                        pos: originBasedCoord.getPos(),
                        type: -1,
                        hasItem: false
                    })
                }

            }
            allTiles.push(row)
        }
        return allTiles
    }

    allItemsCollected() {
        return this.sections.every(section => section.allItemsCollected())
    }

    getTile(coord) {
        const currSection = this.getCurrSection(coord)
        if(!currSection) {
            return null
        }
        return currSection.getTile(coord)
    }

    move(token, movementCommand) {
        const movementVector = DIRECTIONS[movementCommand]
        const currCoord = token.coordinate
        const updatedCoord = currCoord.offset(movementVector)
        const currSection = this.getCurrSection(updatedCoord)
        if(!currSection || !currSection.canMove(updatedCoord)) {
            return currCoord
        }

        const connectionOffset = currSection.getConnectingOffset(updatedCoord)
        if (!connectionOffset || this.allSectionsRevealed()) {
            return updatedCoord
        }

        this.addSection(connectionOffset)
        currSection.connectAt(updatedCoord)

        return updatedCoord
    }

    addSection(offset) {
        let newSection = this.createSection(offset,
            new Coordinate(9, 5))
        this.sections.push(newSection)
        this.onBoardChange()
    }

    allSectionsRevealed() {
        return this.sectionCount === this.sections.length
    }

    isEscaped(token) {
        const currSection = this.getCurrSection(token.coordinate)
        return currSection.isAtExit(token.coordinate)
    }

    getCurrSection(coord) {
        return this.sections.find(section => section.inBounds(coord))
    }
}

module.exports = {
    Board
}