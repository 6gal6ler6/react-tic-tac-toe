import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Text, useColorMode } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Board from './Board';
import { useGameContext } from '../context/GameContext';

const Game: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isCPUMode, setIsCPUMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { player1Wins, player2Wins, draws, addPlayer1Win, addPlayer2Win, addDraw } = useGameContext();

  const calculateWinner = useCallback((squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const isDraw = useCallback((squares: (string | null)[]) => {
    return squares.every(square => square !== null) && !calculateWinner(squares);
  }, [calculateWinner]);

  const minimax = useCallback((squares: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const scores: { [key: string]: number } = {
      'X': -1,
      'O': 1,
      'draw': 0
    };
    const winner = calculateWinner(squares);
    if (winner !== null) {
      return scores[winner as keyof typeof scores];
    }
    if (isDraw(squares)) {
      return scores['draw'];
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [calculateWinner, isDraw]);

  const getBestMove = useCallback((squares: (string | null)[]) => {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }, [minimax]);

  useEffect(() => {
    const opponent = searchParams.get('opponent');
    setIsCPUMode(opponent === 'cpu');
  }, [searchParams]);

  const handleClick = useCallback((i: number) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[i] || isDraw(squaresCopy)) return;
    squaresCopy[i] = isXNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
  }, [isXNext, squares, calculateWinner, isDraw]);

  useEffect(() => {
    if (isCPUMode && !isXNext && !calculateWinner(squares) && !isDraw(squares)) {
      const bestMove = getBestMove(squares);
      if (bestMove !== null && bestMove !== undefined) {
        handleClick(bestMove);
      }
    }
  }, [isCPUMode, isXNext, squares, calculateWinner, getBestMove, isDraw, handleClick]);
  
  const handleReset = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  }, []);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner || isDraw(squares)) {
      if (!gameOver) {
        if (winner === 'X') {
          addPlayer1Win();
        } else if (winner === 'O') {
          addPlayer2Win();
        } else if (isDraw(squares)) {
          addDraw();
        }
        setGameOver(true);
        setTimeout(() => handleReset(), 2000); // Reset the game after 2 seconds
      }
    } else {
      setGameOver(false);
    }
  }, [squares, gameOver, addPlayer1Win, addPlayer2Win, addDraw, calculateWinner, isDraw, handleReset]);



  const handleBack = () => {
    navigate('/');
  };

  const status = calculateWinner(squares) ? `Winner: ${calculateWinner(squares)}` : isDraw(squares) ? "It's a Draw!" : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <Box textAlign="center" mt={5}>
      <Button onClick={toggleColorMode} mb={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      <Button onClick={handleBack} mb={4} ml={4}>
        Back
      </Button>
      <Text mb={4} fontSize="2xl">{status}</Text>
      <Box display="flex" justifyContent="center">
        <Board squares={squares} onClick={handleClick} />
      </Box>
      {(calculateWinner(squares) || isDraw(squares)) && (
        <Button onClick={handleReset} mt={4}>
          Reset Game
        </Button>
      )}
      <Box mt={4}>
        <Text>Player 1 Wins: {player1Wins}</Text>
        <Text>Player 2 Wins: {player2Wins}</Text>
        <Text>Draws: {draws}</Text>
      </Box>
    </Box>
  );
};

export default Game;
