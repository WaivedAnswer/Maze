import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import Menu from './components/menu';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/game/:gameId" element={<App />}/>
        <Route path="/" element={<Menu />}/>
       </Routes>
    </Router>
   
  </React.StrictMode>,
  document.getElementById('root')
);
