import { TokenType } from "../models/token"
import {GameStates} from "../models/gameState"

import greenPortal from "../images/green-portal.png"
import orangePortal from "../images/orange-portal.png"
import yellowPortal from "../images/yellow-portal.png"
import purplePortal from "../images/purple-portal.png"

import NormalTile from "./tileNormal"

const Portal = ({tile, gameState, selectedPortal }) => {
    const show = gameState === GameStates.EXPLORE || gameState === GameStates.STEAL
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

    const isSelected = selectedPortal ? selectedPortal.coord.toString() === tile.coord.toString() : false
    return (
        <div className={className}>
            {isSelected ? <div className='portal-indicator'/> : ""}
            <img src={tileImg} className="tile-image" alt='' /> 
        </div>
    )
}

export default Portal