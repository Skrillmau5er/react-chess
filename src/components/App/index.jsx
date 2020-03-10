import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Game from '../Game';
import Home from './Home';
import Tutorial from './Tutorial';
import Login from './Login';
import CreateUser from './CreateUser';
import { auth } from '../../services/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../../styles/App/index.scss';

export default class App extends React.Component {
  state = {
    user: null,
    anchorEl: null,
    open: false,
    isLoaded: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

  signOut = () => {
    auth.signOut()
    .then(() => {
      window.location.href = '/'
    })
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    this.setState({ isLoaded: true });
  }

  render() {
    const { user, open, anchorEl, isLoaded } = this.state;
    return (
      <div className='App'>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              Quick Chess
            </Typography>
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <ToastContainer />
        {isLoaded && (
          <Router>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (user ? <Home {...props} /> : <Login {...props} />)}
              />
              <Route exact path='/createUser' render={props => <CreateUser {...props} />} />
              <Route path='/game/' render={props => <Game {...props} />} />
              <Route path='/tutorial/' render={props => <Tutorial {...props} />} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}
