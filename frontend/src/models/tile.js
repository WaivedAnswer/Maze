let TileType = {
    UNKNOWN: -1,
    NORMAL: 1,
    EXIT: 2,
    WALL: 3,
    CONNECT: 4,
    PORTAL: 5
}

class Tile {
    constructor(coord, type, hasItem, item, tokenType) {
        this.coord = coord
        this.type = type
        this.hasItem = hasItem
        this.item = item
        this.tokenType = tokenType
    }
}

export { Tile, TileType }
