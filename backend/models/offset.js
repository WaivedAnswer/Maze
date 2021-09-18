class Offset {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    relativeTo(coord) {
        return new Offset(this.x - coord.x, this.y - coord.y)
    }
}

module.exports = {
    Offset
}