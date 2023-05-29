import React, { useRef } from 'react'
import {
  useNavigate
} from "react-router-dom"
import axios from 'axios';
import logger from '../services/logger'

function Menu() {
  const navigate = useNavigate();
  const joinCodeRef = useRef(null)
  const playerNameRef = useRef(null)

  const createGameClick = async () => {
    const response = await axios.post('/games', {gameId: joinCodeRef.current.value});

    logger.debug(response.data)
    // The server responds with the id of the new user
    const gameId = response.data.gameId;
    logger.debug('Game Id response:' + gameId)
    navigate(`/game/${gameId}`);
  };

  const joinGameClick = async () => {
    const gameId = joinCodeRef.current.value
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="menu">
      <h1>Magic Maze</h1>
      <div className="menuSelections">
        <div className="menuRow" >
          <input type="text" ref={playerNameRef} placeholder='Nickname' className="inputText" />
        </div>
        <div className="menuRow" >
        <input type="text" ref={joinCodeRef} placeholder='Game Code' className="inputText" />
        </div>
        <div className ="menuRow">
          <button onClick={() => createGameClick()} className = "button" >Create</button>
          <button onClick={joinGameClick} className = "button" >Join</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
