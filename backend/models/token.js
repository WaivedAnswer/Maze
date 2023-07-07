class Token {
    constructor(coordinate) {
        this.coordinate = coordinate
        this.items = []
        this.escaped = false
    }

    getPos(relativeTo) {
        return this.coordinate.relativeTo(relativeTo).getPos()
    }

    getTokenData(relativeTo) {
        return {
            pos: this.getPos(relativeTo),
            escaped: this.escaped
        }
    }

    escape() {
        this.escaped = true
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