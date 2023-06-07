class Token {
    constructor(coordinate) {
        this.coordinate = coordinate
        this.items = []
    }

    getPos(relativeTo) {
        return this.coordinate.relativeTo(relativeTo).getPos()
    }

    /*updateCoords(relativeTo) {
        this.coordinate = this.coordinate.relativeTo(relativeTo)
    }*/

    pickupItem(item) {
        this.items.push(item)
    }
}

module.exports = {
    Token
}