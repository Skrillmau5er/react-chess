import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Game from "./Game";
import Results from "./Results";

const GameRoutes = ({ match, user, setHideMenu }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}/:gameID`}
        render={(props) => <Game {...props} user={user} setHideMenu={setHideMenu}/>}
      />
      <Route
        exact
        path={`${match.path}/:gameID/results`}
        render={(props) => <Results {...props} setHideMenu={setHideMenu} />}
      />
    </Switch>
  );
};
export default GameRoutes;
