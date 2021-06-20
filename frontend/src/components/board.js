import React from 'react'
import Grid from 'react-css-grid'
import Tile from './tile'
import gameService from './../services/game'
import isEqual from "lodash.isequal"

const Board = ({ grid, tokens }) => {
    const handleKeyPress = (event) => {
        if (event.key === 's') {
            gameService.moveDown()
        } else if (event.key === 'w') {
            gameService.moveUp()
        } else if (event.key === 'a') {
            gameService.moveLeft()
        } else if (event.key === 'd') {
            gameService.moveRight()
        }
    }

    const onTokenSelected = (token) => {
        gameService.send(JSON.stringify(
            {
                type: "SELECTED",
                selected: token.id
            }
        ))
    }

    const getToken = (tileCoord) => {
        return tokens.filter(token => isEqual(token.coord, tileCoord))[0]
    }

    return (
        <div className="game-board" onKeyPress={handleKeyPress} tabIndex={0}>
            <Grid width={600 / grid.length} gap={0}>
                {grid.map(
                    row => row.map(tile =>
                        <Tile key={tile.coord.toString()}
                            type={tile.type}
                            token={getToken(tile.coord)}
                            onTokenSelected={onTokenSelected} />)
                )}
            </Grid>
        </div>
    )
}

export default Board