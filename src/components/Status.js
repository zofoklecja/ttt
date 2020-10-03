import React from "react";

function Status(props) {
  const winner = props.currentSquares[props.winningSquares[0]];

  return (
    <div>
      {winner
        ? `Winner: ${winner}`
        : "Next player: " + (props.xIsNext ? "X" : "O")}
    </div>
  );
}

export default Status;
