import React from 'react'
import coinImg from "../images/coins_new.png"
import timerImg from "../images/timer.png"
import {ItemType} from "../models/item"

const Item = ({item}) => {
    let itemImg
    if(item.type === ItemType.COIN) {
        itemImg = coinImg
    } else if(item.type === ItemType.TIMER) {
        itemImg = timerImg
    }
    return (
        <div className='token' >
            <img src={itemImg} alt='token' />
        </div>
    )
}

export default Item