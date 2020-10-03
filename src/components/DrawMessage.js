import React from "react";

function DrawMessage(props) {
  const isActive =
    !props.currentSquares.includes(null) && !props.winningSquares.length;

  if (isActive) {
    return (
      <div>
        It's a draw!{" "}
        <span role="img" aria-label="Flustered face emoji">
          😳
        </span>
      </div>
    );
  } else {
    return null;
  }
}

export default DrawMessage;
