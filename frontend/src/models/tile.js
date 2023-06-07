let TileType = {
    UNKNOWN: -1,
    NORMAL: 1,
    EXIT: 2,
    WALL: 3,
    CONNECT: 4,
    PORTAL: 5
}

class Tile {
    constructor(coord, type, hasItem) {
        this.coord = coord
        this.type = type
        this.hasItem = hasItem
    }
}

export { Tile, TileType }
