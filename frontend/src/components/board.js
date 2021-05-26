import React, { useState } from 'react'
import Grid from 'react-css-grid'
import Tile from './tile'
import gameService from './../services/game'


const tiles = []
for (let i = 0; i < 20; i++) {
    tiles.push(i)
}



const Board = () => {
    const [selectedId, setSelectedId] = useState(0)
    const [updatedTiles, setTiles] = useState(tiles)
    let handler = {
        id: 'board-updates',
        handle: (json) => {
            if (json.type === 'selected-id') {
                setSelectedId(parseInt(json.data.newSelectedId))
            }
            else if (json.type === 'board-update') {
                setTiles(json.data.tiles.map(strTile => parseInt(strTile)))
            }
        }
    }

    gameService.addHandler(handler)

    const moveDown = () => {
        const newSelectedId = selectedId + 1
        gameService.send(`${newSelectedId}`)
        //setSelectedId(selectedId + 1)
    }
    const moveUp = () => {
        const newSelectedId = selectedId - 1
        gameService.send(`${newSelectedId}`)
        //setSelectedId(newSelectedId)
    }

    const handleKeyPress = (event) => {
        if (event.key === 's') {
            moveDown()
        } else if (event.key === 'w') {
            moveUp()
        }
    }

    return (
        <div className="game-board" onKeyPress={handleKeyPress} tabIndex={0}>
            <Grid width={50} gap={0}>
                {updatedTiles.map(
                    tile => <Tile num={tile} key={tile} selected={selectedId === tile} />
                )}
            </Grid>
        </div>
    )
}

export default Board