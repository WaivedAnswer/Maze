const { Coordinate } = require('./coordinate')
const { SectionCoordinate } = require('./sectionCoordinate')

class Game {
    constructor() {
        //likely should move where tokens are initialized
        this.tokenCoords = [new SectionCoordinate(0, new Coordinate(0, 0)), new SectionCoordinate(0, new Coordinate(5, 9))]
    }
}

module.exports = {
    Game
}