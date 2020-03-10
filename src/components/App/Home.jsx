import React, { useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import '../../styles/App/Menu.scss';

const Home = props => {
  return (
    <div className='menu'>
      <Typography variant='h2'>Quick Chess</Typography>
      <div className='button-action-container'>
        <Button
          className='action-button'
          variant='contained'
          color='primary'
          onClick={() => props.history.push('/game')}
        >
          New Game
        </Button>
        <Button
          className='action-button'
          variant='contained'
          color='primary'
          onClick={() => props.history.push('/tutorial')}
        >
          Tutorial
        </Button>
      </div>
    </div>
  );
};

export default Home;
