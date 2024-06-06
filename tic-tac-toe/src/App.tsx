import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import OpponentSelection from './components/OpponentSelection';
import { GameProvider } from './context/GameContext';
import './App.css';

const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OpponentSelection />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
