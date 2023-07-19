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
        right: indicatorInfo.right,
        justifyContent: "center",
        alignItems: "center"
    }
    let imgClassName = "offscreen-image"

    console.log(typeof(indicatorInfo.tokenType))
    switch(indicatorInfo.tokenType) {
        case TokenType.BARBARIAN:
            imgClassName += " barbarian"
            break
        case TokenType.DWARF:
            imgClassName += " dwarf"
            break
        case TokenType.ELF:
            imgClassName += " elf"
            break
        case TokenType.MAGE:
            imgClassName += " mage"
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
        <div className='offscreen' style={indicatorPositionStyle}>
            <img src={directionImg} className="offscreen-direction" alt="offscreen direction"/>
            <img src={indicatorImg} className={imgClassName} alt='offscreen indicator' /> 
        </div>
       
    )
}

export default OffScreenIndicator