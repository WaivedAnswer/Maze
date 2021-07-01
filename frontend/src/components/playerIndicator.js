import MoveIndicator from './moveIndicator'

const PlayerIndicator = ({ playerName, allowedMoves, isSelf }) => {

    return (
        < div className={isSelf ? 'player-self' : 'player-other'}>
            {
                <label>{playerName}</label>
            }
            <MoveIndicator moves={allowedMoves} isSelf={isSelf} />
        </div>
    )
}

export default PlayerIndicator