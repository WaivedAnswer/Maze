import './App.css'
import React, { useState } from 'react'
import Board from './components/board'
import gameService from './services/game'
import Coordinate from './models/coordinate'
import { Tile, TileType } from './models/tile'
import isEqual from "lodash.isequal"
import Token from './models/token'
import PlayerIndicator from './components/playerIndicator'
import Notification from './components/notification'
import Timer from './components/Timer'


const getCoordinate = (pos) => {
  const x = parseInt(pos.x)
  const y = parseInt(pos.y)
  return new Coordinate(x, y)
}

const getTiles = (initData) => {
  let grid = []
  const board = initData.board
  const exits = board.exits.map(exitPos => getCoordinate(exitPos))
  const walls = board.walls.map(wallPos => getCoordinate(wallPos))
  const allTiles = board.tiles.map(tilePos => getCoordinate(tilePos))

  for (let y = 0; y < board.height; y++) {
    let row = []
    for (let x = 0; x < board.width; x++) {
      const currPos = new Coordinate(x, y)
      let type
      if (exits.some(exitPos => isEqual(exitPos, currPos))) {
        type = TileType.EXIT
      } else if (walls.some(wall => isEqual(wall, currPos))) {
        type = TileType.WALL
      } else if (allTiles.some(tile => isEqual(tile, currPos))) {
        type = TileType.NORMAL
      } else {
        type = TileType.UNKNOWN
      }

      row.push(new Tile(currPos, type))
    }
    grid.push(row)
  }
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
  return data.tokens.map((pos, idx) =>
    new Token(idx,
      getCoordinate(pos),
      data.selectedTokens.some(selected => selected === idx),
      getSelectedBy(data.selections, idx)))
}

function App() {
  const [updatedTiles, setTiles] = useState([[]])
  const [tokens, setTokens] = useState([])
  const [allowedMoves, setMoves] = useState([])
  const [playerName, setPlayerName] = useState("")
  const [otherPlayers, setOtherPlayers] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [remainingSeconds, setRemainingSeconds] = useState(null)

  const clearNotification = () => {
    setNotificationMessage(null)
  }
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
        setTokens(getTokens(json.data))
      } else if (json.type === 'board-update') {
        setTiles(getTiles(json.data))
        setTokens(getTokens(json.data.tokenData))
        clearNotification()
      } else if (json.type === 'win') {
        notify("You have won the game!", false, true)
      } else if (json.type === 'movements') {
        gameService.setMovements(json.data.movements)
        setMoves(json.data.movements)
      } else if (json.type === 'name') {
        setPlayerName(json.data.name)
      } else if (json.type === 'all-players') {
        setOtherPlayers(json.data.filter(playerInfo => playerInfo.playerName !== playerName))
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

  gameService.addHandler(handler)

  const reset = (_) => {
    gameService.reset()
  }

  const doSomething = (playerName) => {
    gameService.doSomething(playerName)
  }

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
        <Board grid={updatedTiles} tokens={tokens} />
      </div>

    </div >
  );
}

export default App;
