import React from 'react';
import '../styles/GameStatus.css';
import BoardPiece from './BoardPiece';


export default function GameStatus(props) {
  let theFallen;
  if(props.lostPieces){
     theFallen = props.lostPieces.map(x => {
      return <BoardPiece piece={x.name} player={x.player} fallen="fallen"/>
    })
  }
  return(
    <div className="game-status-area">  
      <h1 id='turnHeader'>Turn</h1>
      <div className="turn-container">
        <span id="turn" className={(props.turn === 1) ? 'black-turn' : 'white-turn'}></span>
      </div>
      
      <div className="lost-pieces">
        <h1>The Fallen</h1>
        {theFallen}
      </div>
    </div>
  )
}