import downImg from "../images/escalator_down.png"
import upImg from "../images/escalator_up.png"
import {EscalatorOrientation} from '../models/escalator'

const Escalator = ({ escalator }) => {
    const rowStart = escalator.getMinY() + 1
    const colStart = escalator.getMinX() + 1
    let escImg
    switch(escalator.getOrientation()) {
        case EscalatorOrientation.DOWN:
            escImg = downImg
            break;
        case EscalatorOrientation.UP:
            escImg = upImg
            break;
        default:
            throw new Error ("Invalid Orientation")
    }

    const tileStyle = {
        gridRow: `${rowStart} / span ${escalator.getRowSpan()}`,
        gridColumn: `${colStart} / span ${escalator.getColSpan()}`,
    }

    return (
        < div className = 'escalator' style = {tileStyle} >
            <img className = 'escalator-img' src={escImg} alt='escalator' />
        </div>
    )
}

export default Escalator