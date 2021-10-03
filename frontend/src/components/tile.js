import { TileType } from "../models/tile"
import Token from "./token"
import Item from "./item"

const Tile = ({ token, onTokenSelected, tile }) => {
    let className
    const type = tile.type
    if (type === TileType.EXIT) {
        className = 'tile-exit'
    } else if (type === TileType.WALL) {
        className = 'tile-wall'
    } else if (type === TileType.UNKNOWN) {
        className = 'tile-unknown'
    } else if (type === TileType.CONNECT) {
        className = 'tile-connect'
    } else {
        className = 'tile'
    }

    return (
        <div className={className}>
            <Token token={token} onTokenSelected={onTokenSelected}/>
            { tile.hasItem ? <Item/> : null}
        </div>
    )
}

export default Tile