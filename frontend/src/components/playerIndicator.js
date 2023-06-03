import MoveIndicator from './moveIndicator'

const OtherPlayer = ({ playerName, allowedMoves, doSomething }) => {

    const onClickDoSomething = (_) => {
        doSomething(playerName)
    }
    return (
        < div className='player-other'>
            <div className='player-bar'>
                <label>{playerName}</label>
                {
                    allowedMoves.map(move =>  <MoveIndicator key={move} move={move} isSelf={false}></MoveIndicator>)
                }
                <button className='doSomethingButton' onClick={onClickDoSomething}>!</button>
                
            </div>
        </div>
    )
}

export default OtherPlayer