import '../App.css'
import React, { useState, useEffect } from 'react'
import Board from './board'
import GameService from '../services/gameService'
import logger from '../services/logger'
import Coordinate from '../models/coordinate'
import {GameStates} from '../models/gameState'
import {EscalatorModel} from '../models/escalator'
import {WallModel} from '../models/wallModel'
import { Tile, TileType } from '../models/tile'
import { Item } from '../models/item'
import { Token } from '../models/token'
import OtherPlayer from './playerIndicator'
import Moves from './moves'
import Notification from './notification'
import Toolbar from './toolbar'
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
    case 4:
      return TileType.PORTAL
    default:
      return TileType.UNKNOWN
  }
}

const getTile = (tileData) => {
  const itemData = tileData.item
  let item
  if(itemData) {
    item = new Item(itemData.type, itemData.tokenType)
  }

  return new Tile(getCoordinate(tileData.pos), 
  getTileType(tileData.type), 
  tileData.hasItem, 
  item,
  tileData.tokenType)
}

const getTileRow = (row) => {
  return row.map(tileData => getTile(tileData))
}

const getTiles = (tiles) => {
  const grid = tiles.map( row => getTileRow(row))
  return grid
}

const getEscalators = (escalators) => {
  return escalators.map( escalator => new EscalatorModel(escalator.id, getCoordinate(escalator.start), getCoordinate(escalator.end)))
}

const getWalls = (walls) => {
  return walls.map( wall => new WallModel(getCoordinate(wall.start), getCoordinate(wall.end)))
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
  const newTokens = data.tokens.map((tokenData, idx) =>
  new Token(idx,
    getCoordinate(tokenData.pos),
    getSelectedBy(data.selections, idx),
    tokenData.escaped,
    tokenData.type))
  return newTokens
}

function Game({realPlayerName}) {
  const [updatedTiles, setTiles] = useState([[]])
  const [escalators, setEscalators] = useState([])
  const [walls, setWalls] = useState([])
  const [tokens, setTokens] = useState([])
  const [allowedMoves, setMoves] = useState([])
  const [allPlayers, setAllPlayers] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [remainingSeconds, setRemainingSeconds] = useState(null)
  const [gameService, setGameService] = useState(null)
  const [remainingSections, setRemainingSections] = useState(0)
  const [gameState, setGameState] = useState(null)

  const clearNotification = () => {
    setNotificationMessage(null)
  }
  let { gameId } = useParams();
  useEffect(() => {
    let service = new GameService(gameId, realPlayerName)
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
          logger.debug('Board UPDATE')
          setTiles(getTiles(json.data.board.tiles))
          setEscalators(getEscalators(json.data.board.escalators))
          setWalls(getWalls(json.data.board.walls))
          setTokens(getTokens(json.data.tokenData))
          setRemainingSections(json.data.remainingSections)
          setGameState(json.data.state)
          clearNotification()
        } else if (json.type === 'win') {
          setGameState(GameStates.WIN)
        } else if (json.type === 'movements') {
          service.setMovements(json.data.movements)
          setMoves(json.data.movements)
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
          setGameState(GameStates.LOSS)
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

  const doSomething = (otherPlayerName) => {
    gameService.doSomething(otherPlayerName)
  }

  const otherPlayers = allPlayers.filter(playerInfo => playerInfo.playerName !== realPlayerName)
  return (
    <div className="App">
      <Notification notification={notificationMessage} />
      <div className="board-space">
        <Toolbar gameState={gameState} remaining={remainingSections} remainingSeconds={remainingSeconds}/>
        <div className="board-controls">
          <Moves playerName={realPlayerName} allowedMoves={allowedMoves} />
          <h2 hidden={!otherPlayers.length}>Other Players:</h2>
          {
            otherPlayers.map(player => <OtherPlayer key={player.playerName}
              playerName={player.playerName}
              allowedMoves={player.moves}
              isSelf={false}
              doSomething={doSomething} />)
          }
          <button className='button' id='reset-button' onClick={reset}>Reset</button>
        </div>
        <Board gameState={gameState} grid={updatedTiles} tokens={tokens} escalators={escalators} walls={walls} gameService={gameService} />
      </div>

    </div >
  );
}

export default Game;
