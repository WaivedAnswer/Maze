import React, {useRef} from 'react'


import BoardContext from './boardContext'
import Tile from './tile'
import {TileType} from '../models/tile'

import Token  from './token'
import Escalator from './escalator'
import Wall from './wall'

const Board = ({ gameState, board, tokens, escalators, walls, gameService }) => {
    const boardRef = useRef(null)

    const gridHeight = board.getHeight()
    const gridWidth = board.getWidth()
    const scrollToTile = (tileCoord) => {
        if (boardRef.current) {
          const boardRect = boardRef.current.getBoundingClientRect();
          const tileWidth = 64
          const tileHeight = 64
    
          const tileX = tileCoord.x * tileWidth
          const tileY = tileCoord.y * tileHeight

          const scrollX = tileX - (boardRect.width / 2) + (tileWidth / 2) ;
          const scrollY = tileY - boardRect.height / 2 + (tileHeight / 2);

          const scrollTo = {
            top: scrollY,
            left: scrollX,
            behavior: 'smooth',
          }
    
          boardRef.current.scrollTo(scrollTo);
        }
    }
    
    const handleKeyPress = (event) => {
        let selecting = false
        if (event.key.toLowerCase() === 's') {
            gameService.moveDown()
        } else if (event.key.toLowerCase() === 'w') {
            gameService.moveUp()
        } else if (event.key.toLowerCase() === 'a') {
            gameService.moveLeft()
        } else if (event.key.toLowerCase() === 'd') {
            gameService.moveRight()
        } else if (event.key.toLowerCase() === 'q') {
            const selectedToken = tokens.find(t => t.isMySelection())
            const selectableTokens = tokens.filter(t => !t.escaped)
            if(!selectedToken || selectedToken.escaped) {
                const firstToken = selectableTokens[0]
                scrollToTile(firstToken.coord)
                gameService.select(firstToken.id)
            } else {
                const tokenIndex = selectableTokens.indexOf(selectedToken)
                const nextIndex = (tokenIndex + 1) % selectableTokens.length
                const nextToken = selectableTokens[nextIndex]
                scrollToTile(nextToken.coord)
                gameService.select(nextToken.id)
            }
        }
        else if (event.key.toLowerCase() === 'e' ) {
            const selectedToken = tokens.find(t => t.isMySelection())
            if(selectedToken) {
                const currTile = board.getTile(selectedToken.coord)
                if(currTile.type === TileType.PORTAL) {
                    selecting = true
                    board.portalSelector.handle(selectedToken, currTile, scrollToTile)
                } else {
                    gameService.escalate()
                }
            }
        } else if (event.key === 'Enter') {
            if(!board.portalSelector.isActive()) {
                return
            }
            selecting = true
            const selectedPortal = board.portalSelector.select()
            gameService.teleport(selectedPortal.coord)
        }
        if(!selecting) {
            board.portalSelector.cancel()
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

    const getTileDirection = (tile) => {
        return board.getDirection(tile)
    }

    const boardStyle = {
        overflow: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridWidth}, 64px)`,
        gridTemplateRows: `repeat(${gridHeight}, 64px)`,
        gap: '0px'
     } 

    return (
        <BoardContext.Provider value={boardRef}>
            <div className="game-board" ref={boardRef} style= {boardStyle} onKeyDown={handleKeyPress} tabIndex={0}>
                {
                    board.grid.map((row, rowNum) =>
                            row.map((tile, colNum) =>
                                <Tile key={tile.coord.toString()} tile = {tile} getTileDirection={getTileDirection} gameState={gameState} />
                            )
                    )}
                {
                    escalators.map( (escalator) => <Escalator escalator={escalator}/>)
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