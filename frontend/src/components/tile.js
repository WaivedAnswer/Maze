import { TileType } from "../models/tile"

const Tile = ({ num, selected, type }) => {
    let className
    if (selected) {
        className = 'tile-selected'
    } else if (type === TileType.EXIT) {
        className = 'tile-exit'
    } else {
        className = 'tile'
    }

    return (
        <div className={className}>
        </div>
    )
}

export default Tile