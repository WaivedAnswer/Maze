import './App.css'
import React, { useState, useEffect } from 'react'
import Board from './components/board'
import GameService from './services/gameService'
import logger from './services/logger'
import Coordinate from './models/coordinate'
import { Tile, TileType } from './models/tile'
import Token from './models/token'
import PlayerIndicator from './components/playerIndicator'
import Notification from './components/notification'
import Timer from './components/Timer'
import { useParams } from 'react-router-dom'


const getCoordinate = (pos) => {
  const x = parseInt(pos.x)
  const y = parseInt(pos.y)
  return new Coordinate(x, y)
}

const getTileType = (type) => {
  switch(type) {
    case 0:
      return TileType.NORMAL
    case 1:
      return TileType.WALL
    case 2:
      return TileType.EXIT
    case 3:
      return TileType.CONNECT
    default:
      return TileType.UNKNOWN
  }
}

const getTileRow = (row) => {
  return row.map(tile => new Tile(getCoordinate(tile.pos), getTileType(tile.type), tile.hasItem))
}

const getTiles = (initData) => {
  const board = initData.board
  const grid = board.tiles.map( row => getTileRow(row))
  return grid
}

const getInitials = (str) => {
  const split = str.split(" ")
  return split.map(substr => substr[0]).join('')
}

const getSelectedBy = (selections, idx) => {
  let selection = selections.find(selection => selection.selection === idx)
  if (selection) {
    return getInitials(selection.selectedBy)
  }
  return null
}

const getTokens = (data) => {
  const newTokens = data.tokens.map((pos, idx) =>
  new Token(idx,
    getCoordinate(pos),
    getSelectedBy(data.selections, idx)))
  return newTokens
}

function App() {
  const [updatedTiles, setTiles] = useState([[]])
  const [tokens, setTokens] = useState([])
  const [allowedMoves, setMoves] = useState([])
  const [playerName, setPlayerName] = useState("")
  const [allPlayers, setAllPlayers] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [remainingSeconds, setRemainingSeconds] = useState(null)
  const [gameService, setGameService] = useState(null)

  const clearNotification = () => {
    setNotificationMessage(null)
  }
  let { gameId } = useParams();
  useEffect(() => {
    let service = new GameService(gameId)
    const notify = (message, fade, isGood) => {
      setNotificationMessage({
        message: message,
        isGood: isGood
      })
      if (!fade) {
        return
      }
      setTimeout(() => {
        clearNotification()
      }, 5000)
    }

    let handler = {
      id: 'app-updates',
      handle: (json) => {
        if (json.type === 'token-update') {
          logger.debug('Token update!')
          setTokens(getTokens(json.data))
        } else if (json.type === 'board-update') {
          logger.debug('Board UPDATE')
          setTiles(getTiles(json.data))
          setTokens(getTokens(json.data.tokenData))
          clearNotification()
        } else if (json.type === 'win') {
          notify("You have won the game!", false, true)
        } else if (json.type === 'movements') {
          logger.debug("Setting movement")
          service.setMovements(json.data.movements)
          setMoves(json.data.movements)
        } else if (json.type === 'name') {
          setPlayerName(json.data.name)
          //playerName dependency needs some work
        } else if (json.type === 'all-players') {
          setAllPlayers(json.data)
        } else if (json.type === 'do-something') {
          notify(`${json.data.sender} wants you to do something.`, true, true)
        } else if (json.type === 'timer-update') {
          // probably can update in a different way 
          //date to finish makes this less chatty
          //could have an interval here that counts down
          //timer-update is sent only on time pickups and connections
          setRemainingSeconds(json.data.seconds)
        } else if (json.type === 'lose') {
          notify("You have lost the game..", false, false)
        }
      }
    }
    service.addHandler(handler)
    async function initialConnect() {
      await service.connect()
      service.getInitialUpdate()
    }
    initialConnect()
    setGameService(service)
  },
  [gameId])


  const reset = (_) => {
    gameService.reset()
  }

  const doSomething = (playerName) => {
    gameService.doSomething(playerName)
  }

  const otherPlayers = allPlayers.filter(playerInfo => playerInfo.playerName !== playerName)

  return (
    <div className="App">
      <Notification notification={notificationMessage} />
      <div className="board-space">
        <div className="board-controls">
          <Timer remainingSeconds={remainingSeconds} />
          <br />
          <PlayerIndicator playerName={playerName} allowedMoves={allowedMoves} isSelf={true} />
          <br />
          <h2 hidden={!otherPlayers.length}>Other Players:</h2>
          {
            otherPlayers.map(player => <PlayerIndicator key={player.playerName}
              playerName={player.playerName}
              allowedMoves={player.moves}
              isSelf={false}
              doSomething={doSomething} />)
          }
          <button onClick={reset}>Reset</button>
        </div>
        <Board grid={updatedTiles} tokens={tokens} gameService={gameService} />
      </div>

    </div >
  );
}

export default App;
