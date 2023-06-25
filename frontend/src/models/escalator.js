const EscalatorOrientation = {
    DOWN: 0,
    UP: 1
}

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

    getOrientation() {
        const minX = this.getMinX()
        const minY = this.getMinY()
        if( (minX === this.startCoord.x && minY === this.startCoord.y) 
            || (minX === this.endCoord.x && minY === this.endCoord.y )) {
            return EscalatorOrientation.DOWN
        } else {
            return EscalatorOrientation.UP
        }
    }
}

export { EscalatorModel, EscalatorOrientation }