import React, {useRef, useState} from 'react'


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
    const scrollToTile = (tile) => {
        if (boardRef.current) {
          const boardRect = boardRef.current.getBoundingClientRect();
    
          const scrollX = elementRect.left + elementRect.width / 2 - ancestorRect.left - ancestorRect.width / 2;
          const scrollY = elementRect.top + elementRect.height / 2 - ancestorRect.top - ancestorRect.height / 2;
    
          ancestorRef.current.scrollTo({
            top: ancestorRef.current.scrollTop + scrollY,
            left: ancestorRef.current.scrollLeft + scrollX,
            behavior: 'smooth',
          });
        }
    
    const handleKeyPress = (event) => {
        if (event.key.toLowerCase() === 's') {
            gameService.moveDown()
        } else if (event.key.toLowerCase() === 'w') {
            gameService.moveUp()
        } else if (event.key.toLowerCase() === 'a') {
            gameService.moveLeft()
        } else if (event.key.toLowerCase() === 'd') {
            gameService.moveRight()
        } else if (event.key.toLowerCase() === 'e' ) {
            const selectedToken = tokens.find(t => t.isMySelection())
            if(selectedToken) {
                const currTile = board.getTile(selectedToken.coord)
                if(currTile.type === TileType.PORTAL) {
                    board.portalSelector.handle(selectedToken, currTile)
                } else {
                    gameService.escalate()
                }
            }
        } else if (event.key === 'Enter') {
            if(!board.portalSelector.isActive()) {
                return
            }
            //TODO change to id based 
            const selectedPortal = board.portalSelector.select()
            gameService.teleport(selectedPortal.coord)
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

    const onTeleport = (coord) => {
        gameService.teleport(coord)
    }

    const getTileDirection = (tile) => {
        return board.getDirection(tile)
    }

    const boardStyle = {
        padding: '36px',
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
                                <Tile key={tile.coord.toString()} tile = {tile} onTeleport={onTeleport} getTileDirection={getTileDirection} gameState={gameState} />
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