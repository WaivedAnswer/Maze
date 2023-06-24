import React from 'react'
import Tile from './tile'
import Escalator from './escalator'
import isEqual from "lodash.isequal"

const Board = ({ grid, tokens, escalators, gameService }) => {
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

    const getToken = (tileCoord) => {
        return tokens.find(token => isEqual(token.coord, tileCoord))
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
                                <Tile
                                    tile = {tile}
                                    token={getToken(tile.coord)}
                                    onTokenSelected={onTokenSelected}
                                    onTeleport={onTeleport} />
                            </div>

                        )
                )}
            {
                escalators.map( (escalator) => <Escalator escalator={escalator}/>)
            }
        </div>
    )
}

export default Board