import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import GameRoutes from '../Game';
import Home from './Home';
import Tutorial from './Tutorial';
import Login from './Login';
import CreateUser from './CreateUser';
import { auth } from '../../services/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/App/index.scss';
import ErrorPage from './ErrorPage';
import PrivateRoute from './PrivateRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#EC625F',
          },
        },
      }),
    []
  );

  const signOut = () => {
    auth.signOut().then(() => {
      window.location.href = '/';
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
      }
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className='App'>
      {isLoaded && (
        <ThemeProvider theme={theme}>
          <Router>
            <ToastContainer />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) =>
                  user ? (
                    <Home {...props} user={user} signOut={signOut} />
                  ) : (
                    <Login {...props} />
                  )
                }
              />
              <Route exact path='/createUser' render={(props) => <CreateUser {...props} />} />
              <Route
                path='/game'
                user={user}
                render={(props) => <GameRoutes {...props} user={user} />}
              />
              <PrivateRoute path='/tutorial' render={(props) => <Tutorial {...props} />} />
              <Route path='*'>
                <ErrorPage />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      )}
    </div>
  );
};

export default App;