import React, {useState, useEffect, useRef, useContext} from 'react'
import dwarf from "../images/dwarf_right.png"
import warrior from "../images/warrior2.png"
import elf from "../images/elf_bow.png"
import mage from "../images/mage.png"

import { TokenType } from "../models/token"
import {TileDirection} from"../models/tileDirection"

import BoardContext from "./boardContext"
import OffScreenIndicator from './offScreenIndicator'

const getRightOffset = (boardRect, tokenRect) => {
    return Math.min(boardRect.width, Math.max(boardRect.right - tokenRect.right, 0))
}

const getBottomOffset = (boardRect, tokenRect) => {
    return Math.min(boardRect.height, Math.max(boardRect.bottom - tokenRect.bottom, 0))
} 

const Token = ({ token, onTokenSelected}) => {
    const [indicatorInfo, setIndicatorInfo] = useState(null)
    const myRef = useRef(null);
    const parentRef = useContext(BoardContext)
    useEffect(() => {
    const parent = parentRef
    function checkIfInView() {
        if(!token || !myRef.current || !parent.current) {
            setIndicatorInfo(null)
            return
        }
        const tokenRect = myRef.current.getBoundingClientRect()
        const boardRect = parent.current.getBoundingClientRect()
        const isInView = (
            tokenRect.top < boardRect.bottom &&
            tokenRect.left < boardRect.right &&
            tokenRect.bottom > boardRect.top &&
            tokenRect.right > boardRect.left
        );
        if(isInView) {
            setIndicatorInfo(null)
            return
        }
        const upDist = boardRect.top - tokenRect.bottom
        const downDist = tokenRect.top - boardRect.bottom
        const leftDist = boardRect.left - tokenRect.right
        const rightDist = tokenRect.left - boardRect.right


        const maxDist = Math.max(upDist, downDist, leftDist, rightDist)
        if(upDist === maxDist) {
            setIndicatorInfo({direction: TileDirection.UP, 
                bottom: 0,
                right: getRightOffset(boardRect, tokenRect)})
        } else if(downDist === maxDist) {
            setIndicatorInfo({direction: TileDirection.DOWN,
                bottom: 0,
                right: getRightOffset(boardRect, tokenRect)})
        } else if(rightDist === maxDist) {
            setIndicatorInfo({direction: TileDirection.RIGHT,
                bottom:  getBottomOffset(boardRect, tokenRect),
                right: 0})
        } else if(leftDist === maxDist) {
            setIndicatorInfo({direction: TileDirection.LEFT,
                bottom:  getBottomOffset(boardRect, tokenRect),
                right: 0})
        } else {
            throw new Error("No direction specified")
        }
    }

    parent.current.addEventListener('scroll', checkIfInView);
    checkIfInView();

    return () => {
        parent.current.removeEventListener('scroll', checkIfInView);
    };
    }, [token, parentRef]);

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
        <div ref={myRef} className={imgClass} style={tileStyle(token.coord)} onClick={onClick}>
            <img src={img} alt='token' />
           {  indicatorInfo !== null ? <OffScreenIndicator indicatorInfo={indicatorInfo} indicatorImg={img} /> : ""  }
        </div>
    )
}

export default Token