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

        if (currSection.isAtConnection(updatedCoord) && !this.allSectionsRevealed()) {
            let orientation = currSection.getConnectionOrientation(updatedCoord)
            this.addSection(updatedCoord, orientation)
        }

        return new Token(updatedCoord)
    }

    getOffset(coord, orientation) {
        switch (orientation) {
        case DIRECTIONS.RIGHT:
            return coord.offset( {
                x: 1,
                y: 0
            })
        }
        return coord
    }



    addSection(coord, orientation) {
        let newSection = new Section(this.sectionDimensions,
            this.getOffset(coord, orientation),
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