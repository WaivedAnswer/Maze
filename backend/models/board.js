const { Section } = require('./section')
const { Offset } = require('./offset')
const { Tile, TileType } = require('./tile')
const { Coordinate } = require('./coordinate')
const { DIRECTIONS } = require('./direction')

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
        return section
    }

    getMinCoordinate() {
        const offsetX = this.sections.map(section => section.offset.x)
        const minOffsetX = Math.min(...offsetX)
        const offsetY = this.sections.map( section => section.offset.y)
        const minOffsetY = Math.min(...offsetY)
        return new Coordinate(minOffsetX, minOffsetY)
    }

    getData() {
        return {
            height: Math.max(...this.sections.map(section => section.getMaxDimensions(this.getMinCoordinate()).height)),
            width: Math.max(...this.sections.map(section => section.getMaxDimensions(this.getMinCoordinate()).width)),
            exits: this.sections.flatMap(section => section.getExits(this.getMinCoordinate())),
            walls: this.sections.flatMap(section => section.getWalls(this.getMinCoordinate())),
            tiles: this.sections.flatMap(section => section.getAllTiles(this.getMinCoordinate()))
        }
    }

    move(token, movementCommand) {
        const movementVector = DIRECTIONS[movementCommand]
        const currCoord = token.coordinate
        const updatedCoord = currCoord.offset(movementVector)
        const currSection = this.sections.find(section => section.canMove(updatedCoord))
        if(!currSection) {
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
        const currSection = this.sections.find(section => section.canMove(token.coordinate))
        return currSection.isAtExit(token.coordinate)
    }
}

module.exports = {
    Board
}