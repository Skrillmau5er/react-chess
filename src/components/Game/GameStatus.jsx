import React from 'react';
import '../../styles/Game/GameStatus.scss';
import BoardPiece from './BoardPiece';


const GameStatus = (props) => {
  return(
    <div className="game-status-area">  
      <div className="time-left"><h1>Time Left: {props.timeLeft}</h1></div>
      <div className="turn-container">
        <h1 id='turnHeader'>Turn</h1>
        <div className="turn-area">
          <span id="turn" className={(props.turn === 1) ? 'black-turn' : 'white-turn'}></span>
          {props.kingCheckStatus.checked && 'Check!'}
        </div>
      </div>
    </div>
  )
};

export default GameStatus;