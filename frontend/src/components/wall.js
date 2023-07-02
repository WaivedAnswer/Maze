
const Wall = ( {wall}) => {
    const wallStyle = {
        gridRow: `${wall.getStartRow()} / span ${wall.getRowSpan()}`,
        gridColumn: `${wall.getStartCol()} / span ${wall.getColSpan()}`,
        zIndex: 1
    }

    if(wall.isHorizontal()) {
        wallStyle.borderTop = '10px solid #000000'
        wallStyle.height ='0px'
    } else {
        wallStyle.borderLeft = '10px solid #000000'
        wallStyle.width = '0px'
    }

    return (
        < div className = 'wall' style = {wallStyle} >
        </div>
    )
}

export default Wall