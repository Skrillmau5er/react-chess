import React, { useEffect, useState } from 'react';
import '../../styles/Game/Results.scss';
import BoardPiece from './BoardPiece';
import Button from '@material-ui/core/Button';
import { getGame } from '../../services';
import { toast } from 'react-toastify';

const Results = ({ history, match }) => {
  const [game, setGame] = useState(null);
  useEffect(() => {
    getGame(match.params.gameID)
      .then(game => {
        if (!game.inProgress) {
          setGame(game.data);
        } else {
          history.push(`/`);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Error getting game data.');
      });
  }, []);

  // let theFallen;
  // if (lostPieces) {
  //   theFallen = lostPieces.map(x => {
  //     return <BoardPiece piece={x.name} player={x.player} fallen='fallen' />;
  //   });
  // }
  return (
    <div className='results-container'>
      {game && (
        <>
          <h1>Game Over! Well Played</h1>
          <h3>Here are some stats from your game</h3>
          <p>Winner: {game.winner}</p>
          <p>Total Moves: {game.totalMoves}</p>
          {/* <div className='lost-pieces'>
        <h1>Pieces Lost</h1>
        {theFallen}
      </div> */}
          <Button
            style={{ margin: '10px' }}
            variant='contained'
            color='primary'
            onClick={() => history.push('/')}
          >
            Back to Main Menu
          </Button>
        </>
      )}
    </div>
  );
};

export default Results;