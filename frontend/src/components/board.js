import React from 'react'
import Tile from './tile'
import isEqual from "lodash.isequal"

const Board = ({ grid, tokens, gameService }) => {
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

    return (
        <div className="game-board" onKeyPress={handleKeyPress} tabIndex={0}>
            <table >
                <tbody>
                    {
                        grid.map((row, rowNum) =>
                            <tr key={rowNum} >
                                {row.map((tile, colNum) =>
                                    <td key={tile.coord.toString()}>
                                        <Tile
                                            tile = {tile}
                                            type={tile.type}
                                            token={getToken(tile.coord)}
                                            onTokenSelected={onTokenSelected}
                                            onTeleport={onTeleport} />
                                    </td>

                                )}
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default Board