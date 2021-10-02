import React from 'react'
import tokenImg from "../images/token-none.png"
import tokenSelected from "../images/token-selected.png"

const Token = ({ token, onTokenSelected}) => {
    if(!token) {
        return ''
    }

    let imgSrc
    if (token.selectedBy) {
        imgSrc = tokenSelected
    } else if (!token.selectedBy) {
        imgSrc = tokenImg
    }

    const onClick = () => {
        if (token) {
            onTokenSelected(token)
        }
    }

    return (
        <div className='token' onClick={onClick}>
            <img src={imgSrc} alt='token' />
        </div>
    )
}

export default Token