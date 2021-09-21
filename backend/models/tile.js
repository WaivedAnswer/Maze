class Tile {
    constructor(coord, type) {
        this.coord = coord
        this.type = type
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