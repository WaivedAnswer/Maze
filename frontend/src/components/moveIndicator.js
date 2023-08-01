import up from "../images/up.png"
import down from "../images/down.png"
import left from "../images/left.png"
import right from "../images/right.png"
import escalate from "../images/staircase.png"
import select from "../images/selection.png"
import portal from "../images/portal2.png"

const MoveIndicator = ({ move, isSelf }) => {
    let imgSrc
    let keyIcon
    if(move === 'LEFT') {
        imgSrc = left
        keyIcon = 'A'
    } else if(move ==='RIGHT') {
        imgSrc = right
        keyIcon = 'D'
    } else if(move ==='UP') {
        imgSrc = up
        keyIcon = 'W'
    } else if(move ==='DOWN') {
        imgSrc = down
        keyIcon = 'S'
    } else if(move ==='ESCALATE') {
        imgSrc = escalate
        keyIcon = 'E'
    } else if(move ==='PORTAL') {
        imgSrc = portal
        keyIcon = 'E'
    }
    else if(move === 'SELECT') {
        imgSrc = select
        keyIcon = 'Q'
    }
    else {
        console.log("Fail, move: " + move)
    }
    return (
        < div className ='move-icon'>
           <img src={imgSrc} alt='move' />
           {isSelf ? <span>{keyIcon}</span> : ""}
        </div>
    )
}

export default MoveIndicator