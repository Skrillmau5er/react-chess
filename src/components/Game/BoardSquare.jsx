import React from 'react';
import BoardPiece from './BoardPiece';
import '../../styles/Game/BoardSquare.scss';
import {Button} from '@material-ui/core';

const BoardSquare = (props) => {

  return (
    <div
      className={`board-square ${props.color} ${(props.active) ? 'active' : ''} ${(props.path) ? 'path' : ''}`} 
      onClick={props.onClick}
    >
      {props.piece && <BoardPiece piece={props.piece.getName()} player={props.piece.getPlayer()} />}
    </div>
  );
}

export default BoardSquare;
