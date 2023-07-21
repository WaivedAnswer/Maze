import React, {useState, useEffect, useRef, useContext} from 'react'
import dwarf from "../images/dwarf_right.png"
import warrior from "../images/warrior2.png"
import elf from "../images/elf_bow.png"
import mage from "../images/mage.png"

import { TokenType } from "../models/token"
import { getIndicatorInfo } from '../models/offscreen'

import BoardContext from "./boardContext"
import OffScreenIndicator from './offScreenIndicator'

const Token = ({ token, onTokenSelected}) => {
    const [indicatorInfo, setIndicatorInfo] = useState(null)
    const myRef = useRef(null);
    const parentRef = useContext(BoardContext)
    useEffect(() => {
    const parent = parentRef
    function checkIfInView() {
        const indicatorInfo = getIndicatorInfo(myRef, parentRef)
        if (indicatorInfo && token && token.type === TokenType.DWARF) {
            indicatorInfo.imgScale = "60%"
        }
        setIndicatorInfo(indicatorInfo)
    }

    parent.current.addEventListener('scroll', checkIfInView);
    checkIfInView();

    return () => {
        parent.current.removeEventListener('scroll', checkIfInView);
    };
    }, [parentRef]);

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

    const tileStyle = (tileCoord) => {
        const style =  {
        gridColumnStart: `${tileCoord.x + 1}`,
        gridRowStart: `${tileCoord.y + 1}`,
     }
     return style
    }

    return (
        <div 
        ref={myRef} 
        className={imgClass} style={tileStyle(token.coord)} onClick={onClick}>
            <img src={img} alt='token' />
           { indicatorInfo !== null ? <OffScreenIndicator indicatorInfo={indicatorInfo} indicatorImg={img} /> : ""  }
        </div>
    )
}

export default Token