import { TileType } from "../models/tile"

const Tile = ({ token, type, onTokenSelected }) => {
    let className
    if (token && token.isSelected) {
        className = 'token-selected'
    } else if (token && !token.isSelected) {
        className = 'token'
    } else if (type === TileType.EXIT) {
        className = 'tile-exit'
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
        </div>
    )
}

export default Tile