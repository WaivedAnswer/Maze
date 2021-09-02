const { Coordinate } = require('./coordinate')
const { SectionCoordinate } = require('./sectionCoordinate')

class Game {
    constructor() {
        //likely should move where tokens are initialized
        this.tokenCoords = [new SectionCoordinate(0, new Coordinate(0, 0)), new SectionCoordinate(0, new Coordinate(5, 9))]
        this.selectedTokens = new Map()
        this.complete = false
    }

    getSelections() {
        const selections = []
        for (const idx of this.selectedTokens.keys()) {
            selections.push({
                selection: this.selectedTokens.get(idx),
                selectedBy: this.getPlayerName(idx)
            })
        }
        return selections
    }

    select(playerId, selection) {
        this.selectedTokens.set(playerId, selection)
    }

    getTokenData() {
        return {
            tokens: this.tokenCoords.map(token => token.coordinate.getPos()),
            selections: this.getSelections()
        }
    }

    getPlayerName(index){
        return `Player ${index + 1}`
    }
}

module.exports = {
    Game
}