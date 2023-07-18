import React from 'react'
import { GameStates } from "../models/gameState"

const Toolbar = ({ gameState, remaining }) => {

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
    

    return (
        <div className='toolbar'>
            {message}
        </div>
    )
}

export default Toolbar