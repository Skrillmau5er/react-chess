import React from 'react';
import '../styles/BoardSquare.css';

export default function BoardSquare(props) {
  return (
    <span className={`board-square ${props.color} ${(props.active) ? 'active' : ''} ${(props.path) ? 'path' : ''}`} onClick={props.onClick}>
      {props.children}
    </span>
  );
}
