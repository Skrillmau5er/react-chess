import React from 'react';
import CurrentGames from './CurrentGames';
import CreateGame from './CreateGame';
import { Typography } from '@material-ui/core';

const Home = ({ history, user }) => {
  return (
    <div className="home-page mx-5">
      <Typography className="align-center font-xxl" component="h1" variant="div">Quick Chess</Typography>
        <CreateGame player={user} />
      <CurrentGames history={history} uid={user.uid} />
    </div>
  );
};

export default Home;
