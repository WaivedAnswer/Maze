
const MoveIndicator = ({ moves, isSelf }) => {
    const heading = 'Moves:'

    return (
        < div >
            {
                isSelf ? <h2>{heading}</h2> : <h3>{heading}</h3>
            }
            <ul>
                {
                    moves.map(move => <li key={move}>{move}</li>)
                }
            </ul>

        </div>
    )
}

export default MoveIndicator