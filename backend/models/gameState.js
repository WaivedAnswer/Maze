const GameStates = {
    EXPLORE: 0,
    STEAL: 1,
    ESCAPE: 2,
    LOSS: 3,
    WIN: 4
}

class State {
    constructor() {
        this.state = GameStates.EXPLORE
    }

    allSectionsRevealed() {
        if(this.state !== GameStates.EXPLORE) {
            throw new Error('Invalid state change')
        }
        this.state = GameStates.STEAL
    }

    weaponsStolen() {
        if(this.state !== GameStates.STEAL) {
            throw new Error('Invalid state change')
        }
        this.state = GameStates.ESCAPE
    }

    timesUp() {
        if(this.state === GameStates.WIN) {
            throw new Error('Invalid state change')
        }
        this.state = GameStates.LOSS
    }

    escaped() {
        if(this.state !== GameStates.ESCAPE) {
            throw new Error('Invalid state change')
        }
        this.state = GameStates.WIN
    }

    canEscape() {
        return this.state === GameStates.ESCAPE
    }

    canSteal() {
        return this.state === GameStates.STEAL
    }

    isCompleted() {
        return this.state === GameStates.WIN || this.state === GameStates.LOSS
    }
}

module.exports = {
    State,
    GameStates
}