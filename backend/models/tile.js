const { ItemType } = require('./item')
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

    hasCoin() {
        // eslint-disable-next-line eqeqeq
        return this.item != null && this.item.type === ItemType.COIN
    }
}

const TileType = {
    NORMAL: 0,
    WALL: 1,
    EXIT: 2,
    CONNECT: 3,
    PORTAL: 4
}

module.exports = {
    Tile,
    TileType
}