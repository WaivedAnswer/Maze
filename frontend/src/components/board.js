import React from 'react'
import Grid from 'react-css-grid'
import Tile from './tile'
import gameService from './../services/game'
import isEqual from "lodash.isequal"

const Board = ({ updatedTiles: grid, coord }) => {
    const handleKeyPress = (event) => {
        if (event.key === 's') {
            gameService.send('DOWN')
        } else if (event.key === 'w') {
            gameService.send('UP')
        } else if (event.key === 'a') {
            gameService.send('LEFT')
        } else if (event.key === 'd') {
            gameService.send('RIGHT')
        }
    }

    return (
        <div className="game-board" onKeyPress={handleKeyPress} tabIndex={0}>
            <Grid width={600 / grid.length} gap={0}>
                {grid.map(
                    row => row.map(tile =>
                        <Tile num={tile.coord.toString()} key={tile.coord.toString()} type={tile.type} selected={isEqual(coord, tile.coord)} />)
                )}
            </Grid>
        </div>
    )
}

export default Board