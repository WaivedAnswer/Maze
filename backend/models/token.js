class Token {
    constructor(coordinate) {
        this.coordinate = coordinate
    }

    getPos(relativeTo) {
        return this.coordinate.relativeTo(relativeTo).getPos()
    }

    updateCoords(relativeTo) {
        this.coordinate = this.coordinate.relativeTo(relativeTo)
    }
}

module.exports = {
    Token
}