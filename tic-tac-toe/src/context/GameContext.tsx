import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  player1Wins: number;
  player2Wins: number;
  draws: number;
  addPlayer1Win: () => void;
  addPlayer2Win: () => void;
  addDraw: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [draws, setDraws] = useState(0);

  const addPlayer1Win = () => setPlayer1Wins(player1Wins + 1);
  const addPlayer2Win = () => setPlayer2Wins(player2Wins + 1);
  const addDraw = () => setDraws(draws + 1);

  return (
    <GameContext.Provider value={{ player1Wins, player2Wins, draws, addPlayer1Win, addPlayer2Win, addDraw }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
