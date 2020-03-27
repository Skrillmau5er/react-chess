import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Game from './Game';
import Results from './Results';

const GameRoutes = ({match}) => {
  return (
    <Switch>
      <Route path={`${match.path}/results`} render={props => <Results {...props} />} />
      <Route exact path={`${match.path}/:gameID`} render={props => <Game {...props} />} />
    </Switch>
  );
};
export default GameRoutes;
