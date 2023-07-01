import React from 'react'
import Tile from './tile'
import Token from './token'
import Escalator from './escalator'
import Wall from './wall'

const Board = ({ grid, tokens, escalators, walls, gameService }) => {
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

    const gridHeight = grid.length

    const gridWidth = grid.length === 0 ? 0 : grid[0].length

    const boardStyle = {
        margin: '48px',
        height: '100vh',
        overflow: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridWidth}, 64px)`,
        gridTemplateRows: `repeat(${gridHeight}, 64px)`,
        gap: '0px'
     }

     const tileStyle = (tileCoord) => {
        const style =  {
        gridColumnStart: `${tileCoord.x + 1}`,
        gridRowStart: `${tileCoord.y + 1}`,
     }

     return style
    }

    return (
        <div className="game-board" style= {boardStyle} onKeyPress={handleKeyPress} tabIndex={0}>
            {
                grid.map((row, rowNum) =>
                        row.map((tile, colNum) =>
                            <div className='tile-container' key={tile.coord.toString()} style={tileStyle(tile.coord)}>
                                <Tile tile = {tile} onTeleport={onTeleport} />
                            </div>

                        )
                )}
            {
                escalators.map( (escalator) => <Escalator escalator={escalator} onEscalate={onEscalate}/>)
            }
            {
                tokens.map( (token) => <Token token={token} onTokenSelected={onTokenSelected} style={tileStyle(token.coord)}/>)
            }
            {
                walls.map( (wall) => <Wall wall={wall}/>  )
            }     
        </div>
    )
}

export default Board