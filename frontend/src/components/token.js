import React from 'react'
import tokenImg from "../images/dwarf_right.png"

const Token = ({ token, onTokenSelected, style}) => {
    if(!token) {
        return ''
    }

    let imgClass
    if (token.selectedBy) {
        imgClass = 'token-selected'
    } else if (!token.selectedBy) {
        imgClass = 'token'
    }
    
    const onClick = () => {
        if (token) {
            onTokenSelected(token)
        }
    }



    return (
        <div className={imgClass} style={style} onClick={onClick}>
            <img src={tokenImg} alt='token' />
        </div>
    )
}

export default Token