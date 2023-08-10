import React from 'react'
import { GameStates } from "../models/gameState"
import {TokenType} from "../models/token"
import Timer from './Timer'
import WeaponIcon from './weaponIcon'

const Toolbar = ({ gameState, tokens, board, remaining, remainingSeconds }) => {

    let message = ""
    if(gameState !== null) {
        switch(gameState) {
            case GameStates.EXPLORE:
                message = "Explore the maze! Remaining: " + remaining
                break
            case GameStates.STEAL:
                message = "Steal the weapons!"
                break
            case GameStates.ESCAPE:
                message = "Escape the Maze!"
                break
            case GameStates.LOSS:
                message = "Game Over"
                break
            case GameStates.WIN:
                message = "Win!"
                break
            default:
                throw new Error("Invalid game state")
        }
    }

    const weaponTiles = board.getWeaponTiles()

    const isOccupied = (weaponTile) => {
        const occupyingToken = tokens.find(token => token.coord.toString() === weaponTile.coord.toString())
        return occupyingToken && occupyingToken.type === weaponTile.item.tokenType
    }
    const weapons = weaponTiles.map(weaponTile => {
        return {
            type: weaponTile.item.tokenType,
            occupied: isOccupied(weaponTile)}
    })

    

    return (
        <div className='toolbar'>
            <Timer remainingSeconds={remainingSeconds} />
            {message}
            <div class='toolbar-icon-container'>
                {gameState === GameStates.STEAL ? 
                weapons.map( weapon => <WeaponIcon key={weapon.type} occupied={weapon.occupied} weaponType={weapon.type}/>) 
                : ""}
            </div>
        </div>
    )
}

export default Toolbar