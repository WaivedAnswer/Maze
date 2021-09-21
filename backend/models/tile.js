class Tile {
    constructor(coord, type) {
        this.coord = coord
        this.type = type
    }
}

const TileType = {
    WALL: 1,
    EXIT: 2
}

module.exports = {
    Tile,
    TileType
}