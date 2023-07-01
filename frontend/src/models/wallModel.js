class WallModel {
    constructor(startCoord, endCoord) {
        this.startCoord = startCoord
        this.endCoord = endCoord
    }

    getStartRow() {
        return Math.min(this.startCoord.y, this.endCoord.y) + 1
    }

    getStartCol() {
        return Math.min(this.startCoord.x, this.endCoord.x) + 1
    }

    getRowSpan() {
        return Math.max(1, Math.abs(this.startCoord.y - this.endCoord.y))
    }

    getColSpan() {
        return Math.max(1, Math.abs(this.startCoord.x - this.endCoord.x))
    }

    isHorizontal() {
        return this.startCoord.y === this.endCoord.y
    }
}

export { WallModel }