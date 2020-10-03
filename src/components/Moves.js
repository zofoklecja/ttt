import React from "react";

function Moves(props) {
  const moves = props.history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.row}, ${step.column})`
      : "Go to game start";
    const computedClass = step.squares === props.currentSquares ? "active" : "";

    return (
      <li key={move}>
        <button onClick={() => props.jumpTo(move)} className={computedClass}>
          {desc}
        </button>
      </li>
    );
  });

  return <ol>{props.isChrono ? moves : moves.reverse()}</ol>;
}

export default Moves;
