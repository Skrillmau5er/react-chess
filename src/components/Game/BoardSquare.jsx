import React from "react";
import BoardPiece from "./BoardPiece";
import "../../styles/Game/BoardSquare.scss";
import { Button } from "@material-ui/core";

const BoardSquare = ({ color, active, path, onClick, piece, flip }) => {
  return (
    <div
      className={`board-square ${color} ${active ? "active" : ""} ${
        path ? "path" : ""
      }`}
      onClick={onClick}
    >
      {piece && (
        <BoardPiece
          piece={piece.getName()}
          player={piece.getPlayer()}
          flip={flip}
        />
      )}
    </div>
  );
};

export default BoardSquare;
