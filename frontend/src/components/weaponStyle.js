import {TokenType} from "../models/token"
import axe from "../images/axe2.png"
import sword from "../images/sword.png"
import bow from "../images/arrows2.png"
import potion from "../images/potion.png"

const getWeapon = ( tokenType ) => {
    switch(tokenType) {
        case TokenType.DWARF:
            return {
                img: axe,
                color: 'orange'
            }
        case TokenType.BARBARIAN:
            return {
                img: sword,
                color: 'yellow'
            }
        case TokenType.ELF:
            return {
                img: bow,
                color: 'green'
            }
        case TokenType.MAGE:
            return {
                img: potion,
                color: 'purple'
            }
        default:
            throw new Error( "Invalid token type" )
    }
}

export {getWeapon}
