import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import '../../styles/App/Menu.scss';
import { getGamesByUser, deleteGame as deleteGameById } from '../../services';
import { toast } from 'react-toastify';
import CurrentGames from './CurrentGames';
import CreateGameTile from './CreateGameTile';

const Home = ({ history, user, signOut }) => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    getGamesByUser(user.uid)
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const deleteGame = (id) => {
    deleteGameById(id)
      .then((res) => {
        getGames();
        toast.success('Game Successfully deleted');
      })
      .catch((err) => {
        toast.error('Error Deleting Game', err);
      });
  };

  return (
    <div className='menu'>
      <div className='button-action-container'>
        <Typography component='h1' variant='h6'>{user.email}</Typography>
        <CreateGameTile uid={user.uid} />
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
