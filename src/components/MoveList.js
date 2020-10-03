import React from "react";
import Move from "./Move";

function Moves(props) {
  const moves = props.history.map((step, move) => (
    <Move
      currentSquares={props.currentSquares}
      jumpTo={props.jumpTo}
      key={move}
      move={move}
      step={step}
    />
  ));

  return <ol>{props.isChrono ? moves : moves.reverse()}</ol>;
}

export default Moves;
