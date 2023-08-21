import OtherPlayer from './playerIndicator'

const OtherPlayers = ({otherPlayers, doSomething}) =>  {          
    return (
        <div>
            <h2 hidden={!otherPlayers.length}>Other Players</h2>
            {
                otherPlayers.map(player => <OtherPlayer key={player.playerName}
                    playerName={player.playerName}
                    allowedMoves={player.moves}
                    isSelf={false}
                    doSomething={doSomething} />)
            }
            
        </div>
    )
}

  export default OtherPlayers