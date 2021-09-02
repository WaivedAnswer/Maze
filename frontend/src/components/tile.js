import { TileType } from "../models/tile"
import Token from "./token"

const Tile = ({ token, type, onTokenSelected }) => {
    let className
    if (type === TileType.EXIT) {
        className = 'tile-exit'
    } else if (type === TileType.WALL) {
        className = 'tile-wall'
    } else if (type === TileType.UNKNOWN) {
        className = 'tile-unknown'
    } else {
        className = 'tile'
    }

    return (
        <div className={className}>
            <Token token={token} onTokenSelected={onTokenSelected}/>
        </div>
    )
}

export default Tile