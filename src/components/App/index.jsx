import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React from 'react';
import GameRoutes from '../Game';
import Home from './Home';
import Tutorial from './Tutorial';
import Login from './Login';
import CreateUser from './CreateUser';
import { auth } from '../../services/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/App/index.scss';
import { createGame } from '../../services';
import ErrorPage from './ErrorPage';
import PrivateRoute from './PrivateRoute';

export default class App extends React.Component {
  state = {
    user: null,
    anchorEl: null,
    open: false,
    isLoaded: false,
    currentGame: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  createNewGame = () => {
    createGame({
      player: this.state.user.uid
    })
      .then(res => {
        this.setState({ currentGame: res });
      })
      .catch(err => {
        toast.error(err);
      });
  };

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

  signOut = () => {
    auth.signOut().then(() => {
      window.location.href = '/';
    });
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
      this.setState({ isLoaded: true });
    });
  }

  render() {
    const { user, isLoaded } = this.state;
    return (
      <div className='App'>
        {isLoaded && (
          <Router>
            <ToastContainer />
              <Switch>
                <Route
                  exact
                  path='/'
                  render={props =>
                    user ? (
                      <Home
                        {...props}
                        user={user}
                        createNewGame={this.createNewGame}
                        signOut={this.signOut}
                      />
                    ) : (
                      <Login {...props} />
                    )
                  }
                />
                <Route exact path='/createUser' render={props => <CreateUser {...props} />} />
                <PrivateRoute
                  path='/game'
                  user={user}
                  render={props => <GameRoutes {...props} />}
                />
                <PrivateRoute path='/tutorial' render={props => <Tutorial {...props} />} />
                <Route path='*'>
                  <ErrorPage />
                </Route>
              </Switch>
          </Router>
        )}
      </div>
    );
  }
}
