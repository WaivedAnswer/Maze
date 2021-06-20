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
}

module.exports = {
    Coordinate
}