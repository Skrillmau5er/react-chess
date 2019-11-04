import React from 'react';
import BoardPiece from './BoardPiece';
import '../../styles/BoardSquare.scss';

const BoardSquare = (props) => {
  return (
    <span 
      className={`board-square ${props.color} ${(props.active) ? 'active' : ''} ${(props.path) ? 'path' : ''}`} 
      onClick={props.onClick}
    >
      {props.piece && <BoardPiece piece={props.piece.getName()} player={props.piece.getPlayer()} />}
    </span>
  );
}

export default BoardSquare;
