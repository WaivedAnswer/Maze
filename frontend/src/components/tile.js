import { TileType } from "../models/tile"

const Tile = ({ token, type, onTokenSelected }) => {
    let className
    let content

    if (token && token.isSelected) {
        className = 'token-selected'
        content = token.selectedBy
    } else if (token && !token.isSelected) {
        className = 'token'
    } else if (type === TileType.EXIT) {
        className = 'tile-exit'
    } else if (type === TileType.WALL) {
        className = 'tile-wall'
    } else if (type === TileType.UNKNOWN) {
        className = 'tile-unknown'
    } else {
        className = 'tile'
    }

    const onClick = () => {
        if (token) {
            onTokenSelected(token)
        }
    }

    return (
        <div className={className} onClick={onClick}>
            {content}
        </div>
    )
}

export default Tile