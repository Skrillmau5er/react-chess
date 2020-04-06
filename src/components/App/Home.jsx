import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import '../../styles/App/Menu.scss';
import { getGamesByUser, deleteGame as deleteGameById } from '../../services';
import { toast } from 'react-toastify';
import CurrentGames from './CurrentGames';

const Home = ({ history, user, createNewGame, signOut }) => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    getGamesByUser(user.uid)
      .then(res => {
        setGames(res.data);
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const deleteGame = id => {
    deleteGameById(id)
      .then(res => {
        getGames();
        toast.success('Game Successfully deleted');
      })
      .catch(err => {
        toast.error('Error Deleting Game', err);
      });
  };

  return (
    <div className='menu'>
      <Typography variant='h3'>Welcome</Typography>
      <div className='button-action-container'>
        <Button
          className='action-button'
          variant='contained'
          color='primary'
          onClick={async () => {
            await createNewGame();
            history.push('/game');
          }}
        >
          New Game
        </Button>
        <Button
          className='action-button'
          variant='contained'
          color='primary'
          onClick={() => history.push('/tutorial')}
        >
          Tutorial
        </Button>
        <Button
          className='action-button'
          variant='contained'
          color='primary'
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
      <CurrentGames games={games} deleteGame={deleteGame} history={history} />
    </div>
  );
};

export default Home;
