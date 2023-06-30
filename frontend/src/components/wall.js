
const Wall = ( ) => {
    const rowStart = 1
    const colStart = 1
    
    const wallStyle = {
        gridRow: `${rowStart} / span 4`,
        gridColumn: `${colStart} / span 1`,
    }

    return (
        < div className = 'wall' style = {wallStyle} >
        </div>
    )
}

export default Wall