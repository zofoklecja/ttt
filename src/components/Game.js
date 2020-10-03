import React, { useState } from "react";

import Board from "./Board";
import DrawMessage from "./DrawMessage";
import Moves from "./Moves";
import Status from "./Status";

const calculateWinner = (squares) => {
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
      return lines[i];
    }
  }
  return [];
};

function Game(props) {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      row: null,
      col: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isChrono, setIsChrono] = useState(true);

  const [winningSquares, setWinningSquares] = useState([]);

  const handleButtonClick = () => {
    setIsChrono((isChrono) => !isChrono);
  };

  const handleSquareClick = (i) => {
    const currentSquares = history[stepNumber].squares;

    if (calculateWinner(currentSquares).length || currentSquares[i]) {
      return;
    }

    let update = currentSquares.slice(0);
    update[i] = xIsNext ? "X" : "O";

    setHistory((history) =>
      history.slice(0, stepNumber + 1).concat([
        {
          squares: update,
          row: Math.floor(i / 3) + 1,
          column: (i % 3) + 1,
        },
      ])
    );

    setStepNumber((stepNumber) => stepNumber + 1);
    setXIsNext((xIsNext) => !xIsNext);

    setWinningSquares(calculateWinner(update));
  };

  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);

    setWinningSquares(calculateWinner(history[move].squares));
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          winningSquares={winningSquares}
          onClick={(i) => handleSquareClick(i)}
        />
      </div>
      <div className="game-info">
        <Status
          currentSquares={history[stepNumber].squares}
          winningSquares={winningSquares}
          xIsNext={xIsNext}
        />
        <DrawMessage
          currentSquares={history[stepNumber].squares}
          winningSquares={winningSquares}
        />
        <Moves
          currentSquares={history[stepNumber].squares}
          history={history}
          isChrono={isChrono}
          jumpTo={jumpTo}
        />
        <button onClick={() => handleButtonClick()}>
          Toggle history order
        </button>
      </div>
    </div>
  );
}

export default Game;
