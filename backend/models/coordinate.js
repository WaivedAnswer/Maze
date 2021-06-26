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

    getKey() {
        return `${this.x},${this.y}`
    }
}

module.exports = {
    Coordinate
}