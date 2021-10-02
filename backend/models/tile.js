class Tile {
    constructor(coord, type, item) {
        this.coord = coord
        this.type = type
        this.item = item
    }

    isPassable() {
        return this.type !== TileType.WALL
    }

    hasItem() {
        // eslint-disable-next-line eqeqeq
        return this.item != null
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