class Tile {
    constructor(coord, type, item) {
        this.coord = coord
        this.type = type
        this.item = item
    }

    isPassable() {
        return this.type !== TileType.WALL
    }
}

const TileType = {
    NORMAL: 0,
    WALL: 1,
    EXIT: 2
}

module.exports = {
    Tile,
    TileType
}