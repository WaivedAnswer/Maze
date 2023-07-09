import { TileType } from "../models/tile"
import { TokenType } from "../models/token"

import Item from "./item"

import rockTile from "../images/rock.png"
import portalTile from "../images/portal.png"


const Tile = ({tile, onTeleport }) => {
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
        switch(tile.tokenType) {
            case TokenType.DWARF:
                className += ' connect-dwarf'
                break;
            case TokenType.MAGE:
                className += ' connect-mage'
                break;
            case TokenType.BARBARIAN:
                className += ' connect-barbarian'
                break;
            case TokenType.ELF:
                className += ' connect-elf'
                break;
            default:
                throw new Error('Unknown token type')
        }
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
            { tileImg ? <img src={tileImg} className="tile-image" onClick={handleClick} alt='' /> : null}
            { tile.hasItem ? <Item item={tile.item}/> : null}
        </div>
    )
}

export default Tile