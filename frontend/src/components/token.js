import React from 'react'
import dwarf from "../images/dwarf_right.png"
import warrior from "../images/warrior.png"
import elf from "../images/elf_bow.png"
import mage from "../images/mage.png"
import { TokenType } from "../models/token"

const Token = ({ token, onTokenSelected, style}) => {
    if(!token || token.escaped ) {
        return ''
    }

    let imgClass
    if (token.selectedBy) {
        imgClass = 'token-selected'
    } else if (!token.selectedBy) {
        imgClass = 'token'
    }

    let img
    switch(token.type) {
        case TokenType.DWARF:
            img = dwarf
            imgClass += " token-dwarf"
            break;
        case TokenType.ELF:
            img = elf
            imgClass += " token-elf"
            break;
        case TokenType.BARBARIAN:
            img = warrior
            imgClass += " token-barbarian"
            break;
        case TokenType.MAGE:
            img = mage
            imgClass += " token-mage"
            break;
        default:
            throw new Error("Unknown token type")
    }
    
    const onClick = () => {
        if (token) {
            onTokenSelected(token)
        }
    }



    return (
        <div className={imgClass} style={style} onClick={onClick}>
            <img src={img} alt='token' />
        </div>
    )
}

export default Token