import up from "../images/up.png"
import down from "../images/down.png"
import left from "../images/left.png"
import right from "../images/right.png"
const MoveIndicator = ({ move }) => {
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
    } else {
        console.log("Fail, move: " + move)
    }
    return (
        < div className ='move-icon'>
           <img src={imgSrc} alt='move' />
           <span>{keyIcon}</span>
        </div>
    )
}

export default MoveIndicator