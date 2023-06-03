import MoveIndicator from './moveIndicator'

const Moves = ({ playerName, allowedMoves }) => {

    return (
        < div className='player-self'>
            <span id='mainPlayer'>{playerName}</span>
            <h2>Moves</h2>
            <div className = 'player-moves' >
                {
                    allowedMoves.map(move =>  <MoveIndicator key={move} move={move} isSelf={true}></MoveIndicator>)
                }
            </div>
        </div>
    )
}

export default Moves