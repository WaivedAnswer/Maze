const TokenType = {
    DWARF: 1,
    MAGE: 2,
    BARBARIAN: 3,
    ELF: 4
}

class Token {
    constructor(coordinate, type) {
        this.coordinate = coordinate
        this.items = []
        this.escaped = false
        this.type = type
    }

    getPos(relativeTo) {
        return this.coordinate.relativeTo(relativeTo).getPos()
    }

    getTokenData(relativeTo) {
        return {
            pos: this.getPos(relativeTo),
            escaped: this.escaped,
            type: this.type
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
    Token,
    TokenType
}