import React, {useState, useEffect, useRef, useContext} from 'react'
import coinImg from "../images/coins_new.png"
import timerImg from "../images/timer.png"
import axe from "../images/axe2.png"
import sword from "../images/sword.png"
import bow from "../images/arrows2.png"
import potion from "../images/potion.png"
import {ItemType} from "../models/item"
import {TokenType} from "../models/token"
import { getIndicatorInfo } from '../models/offscreen'

import BoardContext from "./boardContext"
import OffScreenIndicator from './offScreenIndicator'

const getWeapon = ( item ) => {
    switch(item.tokenType) {
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
    
const Item = ({item}) => {
    const [indicatorInfo, setIndicatorInfo] = useState(null)
    const myRef = useRef(null);
    const parentRef = useContext(BoardContext)
    useEffect(() => {
    const parent = parentRef
    function checkIfInView() {
        setIndicatorInfo(getIndicatorInfo(myRef, parentRef))
    }

    parent.current.addEventListener('scroll', checkIfInView);
    checkIfInView();

    return () => {
        parent.current.removeEventListener('scroll', checkIfInView);
    };
    }, [parentRef]);
    let itemImg
    let className = 'item'
    let style = {}
    switch(item.type) {
        case ItemType.COIN:
            itemImg = coinImg
            className += ' coin'
            break;
        case ItemType.TIMER:
            itemImg = timerImg
            className += ' time'
            break;
        case ItemType.WEAPON:
            const weapon = getWeapon(item)
            itemImg = weapon.img
            className += ' weapon'
            style.backgroundColor = weapon.color
            break
        default:
            throw new Error('Unknown item type: ' + JSON.stringify(item))
    }


    return (
        <div  ref={myRef} className={className} style={style} >
            <img src={itemImg} alt='item' />
            {  indicatorInfo !== null ? <OffScreenIndicator indicatorInfo={indicatorInfo} indicatorImg={itemImg} /> : ""  }
        </div>
    )
}

export default Item