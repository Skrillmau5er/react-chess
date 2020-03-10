import React from 'react';
import '../../styles/Game/Results.scss';
import BoardPiece from './BoardPiece';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Results = (props, { lostPieces, winner, totalMoves, startNewGame }) => {
  let theFallen;
  if (lostPieces) {
    theFallen = lostPieces.map(x => {
      return <BoardPiece piece={x.name} player={x.player} fallen='fallen' />;
    });
  }
  return (
    <div className='results-container'>
      <h1>Game Over! Well Played</h1>
      <h3>Here are some stats from your game</h3>
      <p>Winner: {winner}</p>
      <p>Total Moves: {totalMoves}</p>
      <div className='lost-pieces'>
        <h1>Pieces Lost</h1>
        {theFallen}
      </div>
      <Button
        style={{ margin: '10px' }}
        variant='contained'
        color='primary'
        onClick={() => props.history.push('/game')}
      >
        Start New Game
      </Button>
      <Button
        style={{ margin: '10px' }}
        variant='contained'
        color='primary'
        onClick={() => props.history.push('/')}
      >
        Back to Main Menu
      </Button>
    </div>
  );
};

export default Results;
