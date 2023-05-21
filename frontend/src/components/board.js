import React from 'react'
import Tile from './tile'
import isEqual from "lodash.isequal"

const Board = ({ grid, tokens, gameService }) => {
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
        //sends with token.id (Where does this come from? is it always populated correctly?)
        gameService.send(JSON.stringify(
            {
                type: "SELECTED",
                selected: token.id
            }
        ))
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
                                            onTokenSelected={onTokenSelected} />
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