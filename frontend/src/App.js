import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import Menu from './components/menu';


function App() {
    const [playerName, setPlayerName] = useState('');
  
    return (
    <Router>
        <Routes>
          <Route path="/game/:gameId" element={<Game  realPlayerName = {playerName} />}/>
          <Route path="/" element={<Menu playerName={playerName} setPlayerName={setPlayerName}/>}/>
         </Routes>
      </Router>
    );
  }
  
  export default App;
ReactDOM.render(
  <React.StrictMode>
   
   
  </React.StrictMode>,
  document.getElementById('root')
);
