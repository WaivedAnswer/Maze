import { TileType } from "../models/tile"

const Tile = ({ token, type, onTokenSelected }) => {
    let className
    if (token) {
        className = 'tile-selected'
    } else if (type === TileType.EXIT) {
        className = 'tile-exit'
    } else {
        className = 'tile'
    }
    console.log(token)

    const onClick = () => {
        if (token) {
            onTokenSelected(token)
        }
    }

    return (
        <div className={className} onClick={onClick}>
        </div>
    )
}

export default Tile