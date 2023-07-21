import React, {useState, useEffect, useRef, useContext} from 'react'
import { TokenType } from "../models/token"
import {GameStates} from "../models/gameState"

import exit from "../images/s1.png"
import { getIndicatorInfo } from '../models/offscreen'

import BoardContext from "./boardContext"
import OffScreenIndicator from './offScreenIndicator'

const Exit = ({tile, gameState }) => {
    const [indicatorInfo, setIndicatorInfo] = useState(null)
    const myRef = useRef(null);
    const parentRef = useContext(BoardContext)
    useEffect(() => {
    const parent = parentRef
    function checkIfInView() {
        const indicatorInfo = getIndicatorInfo(myRef, parentRef)
        if(indicatorInfo) {
            indicatorInfo.tokenType = tile.tokenType
        }
        setIndicatorInfo(indicatorInfo)
    }

    parent.current.addEventListener('scroll', checkIfInView);
    checkIfInView();

    return () => {
        parent.current.removeEventListener('scroll', checkIfInView);
    };
    }, [parentRef]);

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
        <div ref={myRef} className={className}>
            <img src={tileImg} className="tile-image"  alt='' /> 
            {  indicatorInfo !== null && gameState === GameStates.ESCAPE ? <OffScreenIndicator indicatorInfo={indicatorInfo} indicatorImg={tileImg} /> : ""  }
        </div>
    )
}

export default Exit