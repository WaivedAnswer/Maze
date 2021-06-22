
const MoveIndicator = ({ moves }) => {
    console.log(moves)
    return (
        < div >
            <h2>Moves:</h2>
            <ul>
                {
                    moves.map(move => <li>{move}</li>)
                }
            </ul>

        </div>
    )
}

export default MoveIndicator