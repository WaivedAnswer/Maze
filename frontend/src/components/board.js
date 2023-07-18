import React, {useRef} from 'react'


import BoardContext from './boardContext'
import Tile from './tile'
import { getDirection } from '../models/tileDirection'
import Token  from './token'
import Escalator from './escalator'
import Wall from './wall'

const Board = ({ gameState, grid, tokens, escalators, walls, gameService }) => {
    
    const myRef = useRef(null)
    const handleKeyPress = (event) => {
        if (event.key.toLowerCase() === 's') {
            gameService.moveDown()
        } else if (event.key.toLowerCase() === 'w') {
            gameService.moveUp()
        } else if (event.key.toLowerCase() === 'a') {
            gameService.moveLeft()
        } else if (event.key.toLowerCase() === 'd') {
            gameService.moveRight()
        }
    }

    const onTokenSelected = (token) => {
        //sends with token.id (Where does this come from? is it always populated correctly?)
        gameService.send(JSON.stringify(
            {
                type: "SELECTED",
                selected: token.id
            }
        ))
    }

    const onTeleport = (coord) => {
        gameService.teleport(coord)
    }

    const onEscalate = (escalatorId) => {
        gameService.escalate(escalatorId)
    }

    const getTileDirection = (tile) => {
        return getDirection(tile, grid)
    }

    const gridHeight = grid.length

    const gridWidth = grid.length === 0 ? 0 : grid[0].length

    const boardStyle = {
        marginLeft: '36px',
        marginTop: '36px',
        overflow: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridWidth}, 64px)`,
        gridTemplateRows: `repeat(${gridHeight}, 64px)`,
        gap: '0px'
     } 

    return (
        <BoardContext.Provider value={myRef}>
            <div className="game-board" ref={myRef} style= {boardStyle} onKeyPress={handleKeyPress} tabIndex={0}>
                {
                    grid.map((row, rowNum) =>
                            row.map((tile, colNum) =>
                                <Tile key={tile.coord.toString()} tile = {tile} onTeleport={onTeleport} getTileDirection={getTileDirection} gameState={gameState} />
                            )
                    )}
                {
                    escalators.map( (escalator) => <Escalator escalator={escalator} onEscalate={onEscalate}/>)
                }
                {
                    tokens.map( (token) => <Token token={token} onTokenSelected={onTokenSelected}/>)
                }
                {
                    walls.map( (wall) => <Wall wall={wall}/>  )
                }     
            </div>
        </BoardContext.Provider>
    )
}

export default Board