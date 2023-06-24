import escImg from "../images/escalator2.png"

const Escalator = ({ escalator }) => {
    const rowStart = escalator.getMinY() + 1
    const colStart = escalator.getMinX() + 1

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