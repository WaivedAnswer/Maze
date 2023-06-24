class EscalatorModel {
    constructor(startCoord, endCoord) {
        this.startCoord = startCoord
        this.endCoord = endCoord
    }

    getMinX() {
        return Math.min(this.startCoord.x, this.endCoord.x)
    }

    getMinY() {
        return Math.min(this.startCoord.y, this.endCoord.y)
    }

    getRowSpan() {
        return Math.abs(this.startCoord.y - this.endCoord.y) + 1
    }
    
    getColSpan() {
       return Math.abs(this.startCoord.x - this.endCoord.x) + 1
    }
}

export { EscalatorModel }