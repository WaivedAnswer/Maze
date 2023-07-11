import { TileType } from "./tile"
import Coordinate from "./coordinate"

const TileDirection = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    UNKNOWN: 4
}

const getTile  = (grid, coord) => {
    if(coord.y < 0 || coord.y >= grid.length) {
        return null
    }
    if(coord.x < 0 || coord.x >= grid[0].length) {
        return null
    }
    return grid[coord.y][coord.x]
}

function getDirection(tile, grid) {
    if(grid.length === 0 ) {
        return TileDirection.UNKNOWN
    }

    const left = getTile(grid, new Coordinate(tile.coord.x - 1, tile.coord.y))
    const right = getTile(grid, new Coordinate(tile.coord.x + 1, tile.coord.y))
    const up = getTile(grid, new Coordinate(tile.coord.x, tile.coord.y - 1))
    const down = getTile(grid, new Coordinate(tile.coord.x, tile.coord.y + 1))
    const onLeftBorder = tile.coord.x === 0
    const onRightBorder = tile.coord.x === grid[0].length - 1
    const onTopBorder = tile.coord.y === 0
    const onBottomBorder = tile.coord.y === grid.length - 1
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

export { TileDirection, getDirection }
