import React from 'react'
import {
  Link
} from "react-router-dom"

function Menu() {
  return (
    <div className="menu">
      <h1>Magic Maze</h1>
      <Link to="/game">{"Start Game"}</Link>
    </div>
  );
}

export default Menu;
