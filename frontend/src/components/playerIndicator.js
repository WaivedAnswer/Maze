import MoveIndicator from './moveIndicator'

const PlayerIndicator = ({ playerName, allowedMoves, isSelf }) => {

    const displayName = isSelf ? 'ME:' : playerName
    return (
        < div className={isSelf ? 'player-self' : 'player-other'}>
            {
                isSelf ? "" : <label>{displayName}</label>
            }
            <MoveIndicator moves={allowedMoves} isSelf={isSelf} />
        </div>
    )
}

export default PlayerIndicator