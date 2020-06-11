import React from 'react';
import '../../styles/Game/BoardPiece.scss';

//Images for board piece
import bishopB from '../../assets/bishop-black.png';
import kingB from '../../assets/king-black.png';
import knightB from '../../assets/knight-black.png';
import pawnB from '../../assets/pawn-black.png';
import queenB from '../../assets/queen-black.png';
import rookB from '../../assets/rook-black.png';
import bishopW from '../../assets/bishop-white.png';
import kingW from '../../assets/king-white.png';
import knightW from '../../assets/knight-white.png';
import pawnW from '../../assets/pawn-white.png';
import queenW from '../../assets/queen-white.png';
import rookW from '../../assets/rook-white.png';

export default function BoardPiece(props) {
  let img = null;
  // Find image for piece
  // eslint-disable-next-line default-case
  switch(props.piece) {
    case 'rook':
      img = (props.player === 1) ? rookB : rookW;
      break;
    case 'bishop':
      img = (props.player === 1) ? bishopB : bishopW;
      break;
    case 'knight':
      img = (props.player === 1) ? knightB : knightW;
      break;
    case 'queen':
      img = (props.player === 1) ? queenB : queenW;
      break;
    case 'pawn':
      img = (props.player === 1) ? pawnB : pawnW;
      break;
    case 'king':
      img = (props.player === 1) ? kingB : kingW;
      break;
  }
  return (
    <div className={`board-piece-container ${(props.fallen) ? 'fallen' : ''}`}>
      <img className={`board-piece ${(props.fallen) ? 'fallen' : ''} ${props.flip ? 'flip' : ''}`} src={img} alt="chess piece" />
    </div>
  );
}
