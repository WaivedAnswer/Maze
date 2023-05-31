import MoveIndicator from './moveIndicator'

const Moves = ({ playerName, allowedMoves }) => {

    return (
        < div className='player-self'>
            <div className='player-bar'>
                {
                    <label>{playerName}</label>
                }
            </div>
            <h2>Moves</h2>
            <div className = 'player-moves' >
                {
                    allowedMoves.map(move =>  <MoveIndicator move={move}></MoveIndicator>)
                }
            </div>
        </div>
    )
}

export default Moves