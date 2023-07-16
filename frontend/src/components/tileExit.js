import { TokenType } from "../models/token"

import exit from "../images/s1.png"

const Exit = ({tile, gameState }) => {
    let className = 'tile-exit'
    const tileImg = exit
    switch(tile.tokenType) {
        case TokenType.DWARF:
            className += ' exit-dwarf'
            break;
        case TokenType.MAGE:
            className += ' exit-mage'
            break;
        case TokenType.BARBARIAN:
            className += ' exit-barbarian'
            break;
        case TokenType.ELF:
            className += ' exit-elf'
            break;
        default:
            throw new Error('Unknown token type')
    }

    return (
        <div className={className}>
            <img src={tileImg} className="tile-image"  alt='' /> 
        </div>
    )
}

export default Exit