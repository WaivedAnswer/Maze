const { Token } = require('./token')
const { Section } = require('./section')
const { Offset } = require('./offset')
const { Coordinate } = require('./coordinate')
const { DIRECTIONS } = require('./direction')

//deals with section coordinates and section connections
class Board {
    constructor(dimensions, onBoardChange) {
        this.sectionCount = 3
        this.sectionDimensions = dimensions
        this.sections = [
            new Section(dimensions,
                new Offset(0, 0),
                null)
        ]
        this.onBoardChange = onBoardChange
    }

    getData() {
        return {
            height: Math.max(...this.sections.map(section => section.getMaxDimensions().height)),
            width: Math.max(...this.sections.map(section => section.getMaxDimensions().width)),
            exits: this.sections.flatMap(section => section.getExits()),
            walls: this.sections.flatMap(section => section.getWalls()),
            tiles: this.sections.flatMap(section => section.getAllTiles())
        }
    }

    move(token, movementVector) {
        const updatedCoord = token.coordinate.offset(movementVector)
        const currSection = this.sections.find(section => section.canMove(updatedCoord))
        if(!currSection) {
            return token
        }

        const connectionPoint = currSection.getConnectingOffset(updatedCoord)
        if (connectionPoint && !this.allSectionsRevealed()) {
            this.addSection(connectionPoint)
            currSection.connectAt(updatedCoord)
        }

        return new Token(updatedCoord)
    }

    addSection(offsetCoord) {
        let newSection = new Section(this.sectionDimensions,
            offsetCoord,
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