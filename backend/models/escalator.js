class Escalator {
    constructor(startCoord, endCoord) {
        this.startCoord = startCoord
        this.endCoord = endCoord
    }

    getOtherEnd(coord) {
        if(coord.getKey() === this.startCoord.getKey()) {
            return this.endCoord
        } else if ( coord.getKey() === this.endCoord.getKey()) {
            return this.startCoord
        }
        return null
    }
}

module.exports = {
    Escalator
}