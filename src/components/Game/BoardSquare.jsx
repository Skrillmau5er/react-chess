import React from "react";
import BoardPiece from "./BoardPiece";
import "../../styles/Game/BoardSquare.scss";
import classNames from "classnames";

const BoardSquare = ({ color, active, path, onClick, piece, flip, lastMoveAnimation, lastPieceTaken }) => {
  return (
    <div className={classNames("board-square", color, active && "active", path && "path")} onClick={onClick}>
      {piece && (
        <BoardPiece lastMoveAnimation={lastMoveAnimation} lastPieceTaken={lastPieceTaken} piece={piece} flip={flip} />
      )}
    </div>
  );
};

export default BoardSquare;
