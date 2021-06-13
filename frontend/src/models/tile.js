let TileType = {
    NORMAL: 1,
    EXIT: 2
}

class Tile {
    constructor(coord, type) {
        this.coord = coord
        this.type = type
    }
}

export { Tile, TileType }
