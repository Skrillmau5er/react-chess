import React from 'react';
import BoardPiece from './BoardPiece';
import '../../styles/Game/BoardSquare.scss';
import {Button} from '@material-ui/core';

const BoardSquare = (props) => {

  const determineColor = () => {
    let color;
    if(props.active) {
      color = '#8aceff'
    } else if(props.path) {
       color = props.color === 'grey' ? 'red' : 'rgb(255, 42, 42)';
    }
    else if(props.color === 'grey') {
      color = '#ccc';
    }
    else {
      color = 'white';
    }
    return color;
  };

  return (
    <Button
      className={`board-square ${props.color} ${(props.active) ? 'active' : ''} ${(props.path) ? 'path' : ''}`} 
      onClick={props.onClick}
      style={{
        backgroundColor: determineColor(),
        maxWidth: '50px',
        minWidth: '20px',
        padding: '0',
        borderRadius: '0'
      }}
    >
      {props.piece && <BoardPiece piece={props.piece.getName()} player={props.piece.getPlayer()} />}
    </Button>
  );
}

export default BoardSquare;
