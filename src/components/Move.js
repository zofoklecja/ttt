import React from "react";

function Move(props) {
  const desc = props.move
    ? `Go to move #${props.move} (${props.step.row}, ${props.step.column})`
    : "Go to game start";
  const computedClass =
    props.step.squares === props.currentSquares ? "active" : "";

  return (
    <li>
      <button
        onClick={() => props.jumpTo(props.move)}
        className={computedClass}
      >
        {desc}
      </button>
    </li>
  );
}

export default Move;
