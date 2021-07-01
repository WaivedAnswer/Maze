class Coordinate {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getPos() {
        return {
            x: this.x,
            y: this.y
        }
    }

    offset(offset) {
        return new Coordinate(this.x + offset.x, this.y + offset.y)
    }

    relativeTo(offset) {
        return new Coordinate(this.x - offset.x, this.y - offset.y)
    }

    getKey() {
        return `${this.x},${this.y}`
    }
}

module.exports = {
    Coordinate
}