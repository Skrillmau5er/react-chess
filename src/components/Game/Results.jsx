import React from 'react';
import '../../styles/Results.scss';
import BoardPiece from './BoardPiece';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';


const Results = ({ lostPieces, winner, totalMoves, startNewGame }) => {
  let theFallen;
  if(lostPieces){
     theFallen = lostPieces.map(x => {
      return <BoardPiece piece={x.name} player={x.player} fallen="fallen"/>
    })
  }
  return(
    <div className='results-container'>
      <h1>Game Over! Well Played</h1>
      <h3>Here are some stats from your game</h3>
      <p>Winner: {winner}</p>
      <p>Total Moves: {totalMoves}</p>
      <div className="lost-pieces">
        <h1>Pieces Lost</h1>
        {theFallen}
      </div>
      <Button variant="container" color="primary" onClick={() => startNewGame()}>
        <Link to="/game/">Start New Game</Link>
      </Button>
    </div>
  )
};

export default Results;