class Board {
    constructor(dimensions, exit) {
        this.dimensions = dimensions
        this.exit = exit
    }

    inBounds(selected) {
        return selected >= 0 && selected < this.dimensions
    }

    canMove(pos) {
        return this.inBounds(pos.x) && this.inBounds(pos.y)
    }

    isAtExit(pos) {
        return pos.x === this.exit.x && pos.y === this.exit.y
    }
}

module.exports = {
    Board
}