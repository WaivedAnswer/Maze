import { TokenType } from "../models/token"
import {GameStates} from "../models/gameState"

import greenPortal from "../images/green-portal.png"
import orangePortal from "../images/orange-portal.png"
import yellowPortal from "../images/yellow-portal.png"
import purplePortal from "../images/purple-portal.png"

import NormalTile from "./tileNormal"

const Portal = ({tile, gameState, onTeleport }) => {
    const show = gameState !== GameStates.ESCAPE
    if(!show) {
        return (<NormalTile tile = {tile}/>)
    }
    let className = 'tile-portal'
    let tileImg

    switch(tile.tokenType) {
        case TokenType.DWARF:
            tileImg = orangePortal
            break;
        case TokenType.MAGE:
            tileImg = purplePortal
            break;
        case TokenType.BARBARIAN:
            tileImg = yellowPortal
            break;
        case TokenType.ELF:
            tileImg = greenPortal
            break;
        default:
            throw new Error('Unknown token type')
    }

    const handleClick = () => {
        onTeleport(tile.coord)
    }

    return (
        <div className={className}>
            <img src={tileImg} className="tile-image" onClick={handleClick} alt='' /> 
        </div>
    )
}

export default Portal