import Moves from './moves'

const PlayerIndicator = ({ playerName, allowedMoves, isSelf, doSomething }) => {

    const onClickDoSomething = (_) => {
        doSomething(playerName)
    }
    return (
        < div className={isSelf ? 'player-self' : 'player-other'}>
            <div className='player-bar'>
                {
                    <label>{playerName}</label>
                }
                {
                    isSelf ? "" : <button onClick={onClickDoSomething}>Do Something!</button>
                }
            </div>
            <Moves moves={allowedMoves} isSelf={isSelf} />
        </div>
    )
}

export default PlayerIndicator