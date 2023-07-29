import { TileType } from "./tile"
import { TileDirection } from "./tileDirection"
import Coordinate from "./coordinate"

class BoardModel {
    constructor(grid) {
        this.grid = grid
    }

    getHeight() {
        return this.grid.length
    }

    getWidth() {
       return this.grid.length === 0 ? 0 : this.grid[0].length

    }

    getTile(coord) {
        if(coord.y < 0 || coord.y >= this.grid.length) {
            return null
        }
        if(coord.x < 0 || coord.x >= this.grid[0].length) {
            return null
        }
        return this.grid[coord.y][coord.x]
    }
    
    getDirection(tile) {
        if(this.grid.length === 0 ) {
            return TileDirection.UNKNOWN
        }
    
        const left = this.getTile(new Coordinate(tile.coord.x - 1, tile.coord.y))
        const right = this.getTile(new Coordinate(tile.coord.x + 1, tile.coord.y))
        const up = this.getTile(new Coordinate(tile.coord.x, tile.coord.y - 1))
        const down = this.getTile(new Coordinate(tile.coord.x, tile.coord.y + 1))
        const onLeftBorder = tile.coord.x === 0
        const onRightBorder = tile.coord.x === this.grid[0].length - 1
        const onTopBorder = tile.coord.y === 0
        const onBottomBorder = tile.coord.y === this.grid.length - 1
        if( onLeftBorder || (left && left.type === TileType.UNKNOWN)) {
            return TileDirection.LEFT
        } else if( onRightBorder || (right && right.type === TileType.UNKNOWN)) {
            return TileDirection.RIGHT
        } else if( onTopBorder || (up && up.type === TileType.UNKNOWN)) {
            return TileDirection.UP
        } else if( onBottomBorder || (down && down.type === TileType.UNKNOWN)) {
            return TileDirection.DOWN
        } else {
            return TileDirection.UNKNOWN
        }
    }
}

export { BoardModel }