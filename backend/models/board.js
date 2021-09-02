const { SectionCoordinate } = require('./sectionCoordinate')
const { Coordinate } = require('./coordinate')
const { Section } = require('./section')
const { Offset } = require('./offset')

//deals with section coordinates and section connections
class Board {
    constructor(dimensions, onBoardChange) {
        this.sections = [
            new Section(dimensions,
                new Offset(0, 0), false,
                null),
            new Section(dimensions,
                new Offset(dimensions, 5), true,
                null),
            new Section(dimensions,
                new Offset(0, dimensions + 1), true,
                new Coordinate(9, 5))
        ]
        this.onBoardChange = onBoardChange
    }

    getData() {
        return {
            height: Math.max(...this.sections.map(section => section.getMaxDimensions().height)),
            width: Math.max(...this.sections.map(section => section.getMaxDimensions().width)),
            exits: this.sections.filter(section => !section.hidden).flatMap(section => section.getExits()),
            walls: this.sections.filter(section => !section.hidden).flatMap(section => section.getWalls()),
            tiles: this.sections.filter(section => !section.hidden).flatMap(section => section.getAllTiles())
        }
    }

    move(currSectionCoord, movementVector) {
        //gets section coord location of new movement, gets section checks if can move
        const updatedCoord = currSectionCoord.coordinate.offset(movementVector)
        const newSection = this.sections.find(section => section.canMove(updatedCoord))

        if (newSection) {
            if (newSection.hidden) {
                newSection.hidden = false
                this.onBoardChange()
            }
            return new SectionCoordinate(0, updatedCoord)
        }
        return currSectionCoord
    }

    isAtExit(sectionCoord) {
        const currSection = this.sections.find(section => section.canMove(sectionCoord.coordinate))
        return currSection.isAtExit(sectionCoord.coordinate)
    }
}

module.exports = {
    Board
}