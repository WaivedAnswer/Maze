import React from 'react'
import {
  useNavigate
} from "react-router-dom"
import axios from 'axios';
import logger from '../services/logger'

function Menu() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await axios.post('/games', {});

    logger.debug(response.data)
    // The server responds with the id of the new user
    const gameId = response.data.gameId;
    logger.debug('Game Id response:' + gameId)
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="menu">
      <h1>Magic Maze</h1>
      <button onClick={() => handleClick()}>Create Private Game</button>
    </div>
  );
}

export default Menu;
