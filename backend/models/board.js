const { SectionCoordinate } = require('./sectionCoordinate')
const { Section } = require('./section')
const { Offset } = require('./offset')

//deals with section coordinates and section connections
class Board {
    constructor(dimensions) {
        this.sections = [
            new Section(dimensions,
                new Offset(0, 0)),
            new Section(dimensions,
                new Offset(dimensions, 5))]
    }

    getData() {
        return {
            height: this.sections[1].getMaxDimensions().height,
            width: this.sections[1].getMaxDimensions().width,
            exit: this.sections[0].exit.getPos(),
            walls: this.sections.flatMap(section => section.getWalls()),
            tiles: this.sections.flatMap(section => section.getAllTiles())
        }
    }

    move(currSectionCoord, movementVector) {
        //gets section coord location of new movement, gets section checks if can move
        const updatedCoord = currSectionCoord.coordinate.offset(movementVector)
        if (this.sections.some(section => section.canMove(updatedCoord))) {
            return new SectionCoordinate(0, updatedCoord)
        }
        return currSectionCoord
    }

    isAtExit(sectionCoord) {
        return this.sections[sectionCoord.section].isAtExit(sectionCoord.coordinate)
    }
}

module.exports = {
    Board
}