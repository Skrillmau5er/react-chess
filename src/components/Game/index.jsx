import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game';
import Results from './Results';

const GameRoutes = ({ match, user }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/:gameID`} render={props => <Game {...props} user={user} />} />
      <Route
        exact
        path={`${match.path}/:gameID/results`}
        render={props => <Results {...props} />}
      />
    </Switch>
  );
};
export default GameRoutes;
