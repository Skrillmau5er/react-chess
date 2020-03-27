import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component,user,  ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
