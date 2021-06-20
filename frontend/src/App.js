import './App.css'
import React, { useState } from 'react'
import Board from './components/board'
import gameService from './services/game'
import Coordinate from './models/coordinate'
import { Tile, TileType } from './models/tile'
import isEqual from "lodash.isequal"
import Token from './models/token'


const getCoordinate = (pos) => {
  const x = parseInt(pos.x)
  const y = parseInt(pos.y)
  return new Coordinate(x, y)
}

const getTiles = (initData) => {
  let grid = []
  const exitPos = getCoordinate(initData.exit)
  for (let y = 0; y < initData.height; y++) {
    let row = []
    for (let x = 0; x < initData.width; x++) {
      const currPos = new Coordinate(x, y)
      const type = isEqual(exitPos, currPos) ? TileType.EXIT : TileType.NORMAL
      row.push(new Tile(currPos, type))
    }
    grid.push(row)
  }
  return grid
}

const getTokens = (tokens) => {
  return tokens.map((pos, idx) => new Token(idx, getCoordinate(pos)))
}

function App() {
  const [updatedTiles, setTiles] = useState([[]])
  const [tokens, setTokens] = useState([])

  let handler = {
    id: 'app-updates',
    handle: (json) => {
      if (json.type === 'selected-id') {
        setTokens(getTokens(json.data.tokens))
      } else if (json.type === 'board-update') {
        setTiles(getTiles(json.data))
        setTokens(getTokens(json.data.tokens))
      } else if (json.type === 'win') {
        alert("You have won the game!")
      }
    }
  }
  gameService.addHandler(handler)

  const reset = (_) => {
    gameService.reset()
  }

  return (
    <div className="App">
      <Board grid={updatedTiles} tokens={tokens} />
      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
