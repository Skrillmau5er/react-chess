import React, { useState, useEffect } from "react";
import "../../styles/Game/BoardPiece.scss";

//Images for board piece
import bishopB from "../../assets/bishop-black.png";
import kingB from "../../assets/king-black.png";
import knightB from "../../assets/knight-black.png";
import pawnB from "../../assets/pawn-black.png";
import queenB from "../../assets/queen-black.png";
import rookB from "../../assets/rook-black.png";
import bishopW from "../../assets/bishop-white.png";
import kingW from "../../assets/king-white.png";
import knightW from "../../assets/knight-white.png";
import pawnW from "../../assets/pawn-white.png";
import queenW from "../../assets/queen-white.png";
import rookW from "../../assets/rook-white.png";
import classNames from "classnames";

const BoardPiece = ({ piece, fallen, flip, lastMoveAnimation, lastPieceTaken }) => {
  const [animationStyle, setAnimationStyle] = useState(null);
  const [lastPieceStyle, setLastPieceStyle] = useState(null);

  useEffect(() => {
    getPieceImage();
    determineStyle();
  }, [lastMoveAnimation]);

  const getPieceImage = (piece) => {
    let pieceImg = null;
    // Find image for piece
    // eslint-disable-next-line default-case
    switch (piece?.getName() || null) {
      case "rook":
        pieceImg = piece.getPlayer() === 0 ? rookB : rookW;
        break;
      case "bishop":
        pieceImg = piece.getPlayer() === 0 ? bishopB : bishopW;
        break;
      case "knight":
        pieceImg = piece.getPlayer() === 0 ? knightB : knightW;
        break;
      case "queen":
        pieceImg = piece.getPlayer() === 0 ? queenB : queenW;
        break;
      case "pawn":
        pieceImg = piece.getPlayer() === 0 ? pawnB : pawnW;
        break;
      case "king":
        pieceImg = piece.getPlayer() === 0 ? kingB : kingW;
        break;
    }
    return pieceImg;
  };

  const determineStyle = () => {
    if (lastMoveAnimation) {
      let style = {
        position: "absolute",
        transition: "all 1s ease",
        left: lastMoveAnimation.animationMove[0],
        top: lastMoveAnimation.animationMove[1],
      };
      setAnimationStyle(style);
      setTimeout(() => setAnimationStyle({ left: 0, top: 0 }), 1000);
    }

    if (lastPieceTaken) {
      setTimeout(
        () =>
          setLastPieceStyle({
            display: "none",
          }),
        1600
      );
    }
  };

  return (
    <div className={classNames("board-piece-container", fallen && "fallen")}>
      <img
        style={animationStyle}
        className={classNames("board-piece", fallen && "fallen", flip && "transform rotate-180")}
        src={getPieceImage(piece)}
        alt="chess piece"
      />
      {lastPieceTaken && (
        <img
          style={lastPieceStyle}
          className={classNames("board-piece", fallen && "fallen", flip && "transform rotate-180")}
          src={getPieceImage(lastPieceTaken)}
          alt="chess piece"
        />
      )}
    </div>
  );
};

export default BoardPiece;
