const WallOrientation = {
    HORIZONTAL: 0,
    VERTICAL: 1
}

class Wall {
    constructor(startCoord, endCoord) {
        this.startCoord = startCoord
        this.endCoord = endCoord
    }

    getOrientation() {
        if(this.startCoord.x === this.endCoord.x) {
            return WallOrientation.VERTICAL
        } else if( this.startCoord.y === this.endCoord.y) {
            return WallOrientation.HORIZONTAL
        } else {
            throw new Error ('Invalid Orientation')
        }


    }

    isBetween(firstCoord, secondCoord) {
        if (this.getOrientation() === WallOrientation.VERTICAL) {
            const betweenPlane =  Math.min(firstCoord.x, secondCoord.x) < this.startCoord.x && this.startCoord.x <= Math.max(firstCoord.x, secondCoord.x)
            const withinRange = Math.min(this.startCoord.y, this.endCoord.y) <= Math.min(firstCoord.y, secondCoord.y) && Math.max(this.startCoord.y, this.endCoord.y ) > Math.max(firstCoord.y, secondCoord.y)
            return betweenPlane && withinRange
        } else if (this.getOrientation() === WallOrientation.HORIZONTAL) {
            const betweenPlane =  Math.min(firstCoord.y, secondCoord.y) < this.startCoord.y && this.startCoord.y <= Math.max(firstCoord.y, secondCoord.y)
            const withinRange = Math.min(this.startCoord.x, this.endCoord.x) <= Math.min(firstCoord.x, secondCoord.x) && Math.max(this.startCoord.x, this.endCoord.x ) > Math.max(firstCoord.x, secondCoord.x)
            return betweenPlane && withinRange
        }
        throw new Error('Unsupported')
    }
}

module.exports = {
    Wall
}