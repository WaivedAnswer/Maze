
import { TokenType } from "../models/token"
import { GameStates } from "../models/gameState"
import { TileDirection } from "../models/tileDirection"

import up from "../images/up.png"
import down from "../images/down.png"
import left from "../images/left.png"
import right from "../images/right.png"

import NormalTile from "./tileNormal"


const Connect = ({tile, getTileDirection, gameState }) => {
    let className = 'tile-connect'
    let tileImg
    const tileDirection = getTileDirection(tile)
    const show = tileDirection !== TileDirection.UNKNOWN && gameState === GameStates.EXPLORE

    if(!show) {
        return (<NormalTile tile = {tile}/>)
    }
    switch(tileDirection) {
        case TileDirection.UP:
            tileImg = up
            break
        case TileDirection.DOWN:
            tileImg = down
            break
        case TileDirection.LEFT:
            tileImg = left
            break
        case TileDirection.RIGHT:
            tileImg = right
            break
        default:
            //do nothing
    }
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


    //temporary hack, when the tile direction is unknown the connection point must be connected

    return (
         <div className={className}>
            <img src={tileImg} className="tile-image"  alt='' />
        </div>    
    )
}

export default Connect