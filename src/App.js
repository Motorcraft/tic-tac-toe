import React, { useState } from 'react';
import Chat from "./components/components/chat/Chat";
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [activePlayer, setActivePlayer] = useState('X');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSquareClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
      setActivePlayer(player === 'X' ? 'O' : 'X');
      checkWinner(newBoard);
    }
  };

  const checkWinner = (currentBoard) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
          currentBoard[a] &&
          currentBoard[a] === currentBoard[b] &&
          currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        setTimeout(() => {
          setBoard(initialBoard);
          setWinner(null);
        }, 5000);
        return;
      }
    }

    if (!currentBoard.includes(null)) {
      setWinner('Draw');
      setTimeout(() => {
        setBoard(initialBoard);
        setWinner(null);
      }, 5000);
    }
  };

    const renderResult = () => {
    if (winner) {
      if (winner === 'Draw') {
        return <div>It's a draw!</div>;
      }
      return <div>Player {winner} wins!</div>;
    }
    return null;
  };



  return (
      <div className="App">
        <h1>{renderResult()}</h1>
        <div className="playerX">
          <h2>Player X</h2>
          <div className={activePlayer === 'O' ? 'disabled' : 'board'}>
            {board.map((square, index) => (
                <div key={index}>
                  <button
                      className="square"
                      onClick={() => handleSquareClick(index)}
                      disabled={board[index] || winner || player !== activePlayer}
                  >
                    {board[index]}
                  </button>
                </div>
            ))}
          </div>
        </div>

        <div className="playerO">
          <h2>Player O</h2>
          <div className={activePlayer === 'X' ? 'disabled' : 'board'}>
            {board.map((square, index) => (
                <div key={index}>
                  <button
                      className="square"
                      onClick={() => handleSquareClick(index)}
                      disabled={board[index] || winner || player !== activePlayer}
                  >
                    {board[index]}
                  </button>
                </div>
            ))}
          </div>
        </div>

        <Chat
            player={player}
        />

      </div>
  );
};

export default App;

