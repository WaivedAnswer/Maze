import React from 'react'
import itemImg from "../images/coins_new.png"

const Item = () => {
    return (
        <div className='token' >
            <img src={itemImg} alt='token' />
        </div>
    )
}

export default Item