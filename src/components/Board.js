import React from "react";

import Square from "./Square";

function Board(props) {
  const a = [...Array(3).keys()];

  const renderSquare = (i, isWinning) => {
    const computedClass = isWinning ? "is-winning" : "";

    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => {
          props.onClick(i);
        }}
        isWinningClass={computedClass}
      />
    );
  };

  return a.map((i) => {
    return (
      <div className="board-row" key={i}>
        {a.map((j) => {
          const index = i * a.length + j;
          const isWinning = props.winningSquares?.includes(index);
          return renderSquare(index, isWinning);
        })}
      </div>
    );
  });
}

export default Board;
