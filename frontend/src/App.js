import './App.css'
import React, { useState } from 'react'
import Board from './components/board'
import gameService from './services/game'
import Coordinate from './models/coordinate'
import { Tile, TileType } from './models/tile'
import isEqual from "lodash.isequal"


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

function App() {
  const [updatedTiles, setTiles] = useState([[]])
  const [coord, setCoord] = useState(new Coordinate(0, 0))

  let handler = {
    id: 'app-updates',
    handle: (json) => {
      if (json.type === 'selected-id') {
        setCoord(getCoordinate(json.data.pos))
      } else if (json.type === 'board-update') {
        setCoord(getCoordinate(json.data.pos))
        setTiles(getTiles(json.data))
      } else if (json.type === 'win') {
        alert("You have won the game!")
      }
    }
  }
  gameService.addHandler(handler)

  const reset = (_) => {
    gameService.send('RESET')
  }

  return (
    <div className="App">
      <Board updatedTiles={updatedTiles} coord={coord} />
      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
