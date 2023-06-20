import { TileType } from "../models/tile"
import Token from "./token"
import Item from "./item"
import rockTile from "../images/rock.png"
import portalTile from "../images/portal.png"

const Tile = ({ token, onTokenSelected, tile, onTeleport }) => {
    let className
    let tileImg
    const type = tile.type
    if (type === TileType.EXIT) {
        className = 'tile-exit'
    } else if (type === TileType.WALL) {
        className = 'tile-wall'
        tileImg = rockTile
    } else if (type === TileType.UNKNOWN) {
        className = 'tile-unknown'
    } else if (type === TileType.CONNECT) {
        className = 'tile-connect'
    } else if (type === TileType.PORTAL) {
        className = 'tile-portal'
        tileImg = portalTile
    }
    else {
        className = 'tile'
    }

    const handleClick = () => {
        if(type !== TileType.PORTAL) {
            return
        }
        onTeleport(tile.coord)
    }

    return (
        <div className={className}>
            <Token token={token} onTokenSelected={onTokenSelected}/>
            { tileImg ? <img src={tileImg} className="tile-image" onClick={handleClick} alt='' /> : null}
            { tile.hasItem ? <Item item={tile.item}/> : null}
        </div>
    )
}

export default Tile