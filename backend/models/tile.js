const { ItemType } = require('./item')
class Tile {
    constructor(coord, type, tokenType, item ) {
        this.coord = coord
        this.type = type
        this.item = item
        this.tokenType = tokenType
    }

    isPassable() {
        return this.type !== TileType.WALL
    }

    hasItem() {
        // eslint-disable-next-line eqeqeq
        return this.item != null
    }

    hasNeededItem() {
        // eslint-disable-next-line eqeqeq
        return this.item != null && ( this.item.type !== ItemType.TIMER)
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