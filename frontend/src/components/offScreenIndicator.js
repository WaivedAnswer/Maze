import {TileDirection} from "../models/tileDirection"
import {TokenType} from "../models/token"

import up from "../images/up.png"
import down from "../images/down.png"
import left from "../images/left.png"
import right from "../images/right.png"

const OffScreenIndicator = ({indicatorImg, indicatorInfo }) => {
    let directionImg
    let indicatorPositionStyle = {
        display: "flex",
        bottom: indicatorInfo.bottom,
        top: indicatorInfo.top,
        left: indicatorInfo.left,
        right: indicatorInfo.right,
        justifyContent: "center",
        alignItems: "center"
    }
    const imgStyle = {
        height: indicatorInfo.imgScale,
        width: indicatorInfo.imgScale
    }
    let imgClassName = "offscreen-image"
    let containerClassName = "offscreen"
    switch(indicatorInfo.tokenType) {
        case TokenType.BARBARIAN:
            containerClassName += " barbarian"
            break
        case TokenType.DWARF:
            containerClassName += " dwarf"
            break
        case TokenType.ELF:
            console.log('ELF',indicatorImg,  indicatorInfo.tokenType)
            containerClassName += " elf"
            break
        case TokenType.MAGE:
            console.log('MAGE',indicatorImg,  indicatorInfo.tokenType)
            containerClassName += " mage"
            break
        default:
    }

    switch(indicatorInfo.direction) {
        case TileDirection.UP:
            directionImg = up
            indicatorPositionStyle.flexDirection = "column"
            break
        case TileDirection.DOWN:
            directionImg = down
            indicatorPositionStyle.flexDirection = "column-reverse"
            break
        case TileDirection.LEFT:
            directionImg = left
            indicatorPositionStyle.flexDirection = "row"
            break
        case TileDirection.RIGHT:
            directionImg = right
            indicatorPositionStyle.flexDirection = "row-reverse"
            break
        default:
            throw new Error("Unsupported offscreen direction")
    }



    
    return (
        <div className={containerClassName} style={indicatorPositionStyle}>
            <img src={directionImg} className="offscreen-direction" alt="offscreen direction"/>
            <img src={indicatorImg} style={imgStyle} className={imgClassName} alt='offscreen indicator' /> 
        </div>
       
    )
}

export default OffScreenIndicator