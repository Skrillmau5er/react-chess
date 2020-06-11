import React, { Component } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  LinearProgress,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';
import '../../styles/App/Login.scss';
import { toast } from 'react-toastify';
import { auth, provider } from '../../services/firebase';
import { createUser } from '../../services';
import googleIcon from '../../assets/google-icon.png';
import chessIcon from '../../assets/pawn-black.png';
import Modal from '../Common/Modal';

export default class LoginNew extends Component {
  state = {
    email: null,
    emailErr: null,
    emailForgot: null,
    emailForgotErr: null,
    password: null,
    passwordErr: null,
    isLoading: false,
    isLoadingForgot: false,
    submitted: false,
    displayError: false,
    showForgotPassword: false,
  };

  componentDidMount() {
    this.props.setHideMenu(true);
  };

  componentWillUnmount() {
    this.props.setHideMenu(false);
  }

  validate = () => {
    let validationPassed = true;
    const { email, password } = this.state;

    this.setState({
      emailErr: null,
      passwordErr: null,
    });
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validationPassed = false;
      this.setState({ emailErr: 'Not a valid email' });
    }
    if (!password) {
      validationPassed = false;
      this.setState({ passwordErr: 'Please enter a password' });
    }
    return validationPassed;
  };

  change = (event, field) => {
    this.setState({ [field]: event.target.value }, () => {
      if (this.state.submitted) {
        this.validate();
      }
    });
  };

  showForgotPassword = () => {
    const { showForgotPassword } = this.state;
    this.setState({ showForgotPassword: !showForgotPassword });
  };

  closeForgotPassword = () => {
    this.setState({ showForgotPassword: false });
  };

  forgotPassword = (e) => {
    const { emailForgot } = this.state;
    e.preventDefault();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForgot)) {
      this.setState({ isLoadingForgot: true });
      auth
        .sendPasswordResetEmail(emailForgot)
        .then(() => {
          toast.success('A email has been sent to you to reset your password.');
        })
        .catch((err) => {
          toast.error(`There was an error. ${err}`);
        })
        .finally(() => {
          this.setState({ isLoadingForgot: false, showForgotPassword: false });
        });
    } else {
      this.setState({ emailForgotErr: 'Not a valid email' });
    }
  };

  login = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;

    if (this.validate()) {
      this.setState({
        isLoading: true,
        displayError: false,
      });
      auth.signInWithEmailAndPassword(email, password).catch((err) => {
        this.setState({
          isLoading: false,
        });
        toast.error('Sign in falied');
        console.log(err);
      });
    }
  };

  signInWithGoogle = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    auth
      .signInWithPopup(provider)
      .then((res) => {
        this.createNewUser(res);
      })
      .catch((err) => {
        let errorMessage = err.message;
        toast.error(errorMessage);
      });
  };

  createNewUser = async res => {
    let firstName = null;
    let lastName = null;
    let email = res.user.email;
    let token = res.credential.accessToken
    let userName = null;
    let uid = res.user.uid;
    await createUser({ firstName, lastName, email, token, uid, userName });
    return
  };

  render() {
    const {
      isLoading,
      isLoadingForgot,
      displayError,
      emailErr,
      emailForgotErr,
      showForgotPassword,
      passwordErr,
    } = this.state;
    return (
      <>
        {isLoading && <LinearProgress style={{ height: '5px' }} />}
        <Modal open={showForgotPassword} onClose={this.closeForgotPassword}>
            <Grid container component={Paper} elevation={6} alignContent='center' spacing={6}>
              <Grid item xs={12}>
                <Typography component='h1' variant='h5'>
                  Forgot Password
                </Typography>
                <TextField
                  className="my-4"
                  variant='outlined'
                  margin='normal'
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(e) => this.setState({ emailForgot: e.target.value })}
                  helperText={emailForgotErr ? emailForgotErr : 'We will send you an email with a link to reset your password'}
                  fullWidth
                  error={emailForgotErr ? true : false}
                  autoFocus
                />
                <Button
                  className='submit-forgot-login'
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  disabled={isLoadingForgot}
                  onClick={(e) => this.forgotPassword(e)}
                >
                  Send Forgot Password Email
                </Button>
              </Grid>
            </Grid>
        </Modal>
        <Grid className='login-grid-container' container component='main'>
          <Grid className="m-auto" item>
            <div className='login-item-container'>
              <img src={chessIcon} className='chess-icon' alt="chess piece" />
              <Typography component='h1' variant='h5'>
                Sign into Quick Chess
              </Typography>
              <form className='submit-login-form'>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(e) => this.change(e, 'email')}
                  helperText={emailErr}
                  error={emailErr ? true : false}
                  autoFocus
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  onChange={(e) => this.change(e, 'password')}
                  autoComplete='current-password'
                  error={passwordErr ? true : false}
                  helperText={passwordErr}
                />
                {displayError && (
                  <Typography className='login-error' variant='body2' s>
                    It looks like that didn't work. Try again, click Forgot Password, or Sign Up.
                  </Typography>
                )}
                <Button
                  className='submit-login'
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={isLoading}
                  onClick={(e) => this.login(e)}
                >
                  Sign In
                </Button>
                <Button
                  className='google-login'
                  type='submit'
                  fullWidth
                  variant='outlined'
                  color='primary'
                  disabled={isLoading}
                  onClick={(e) => this.signInWithGoogle(e)}
                >
                  <img className='google-icon' src={googleIcon} alt='google-icon' />
                  Sign In With Google
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Button
                      onClick={() => this.setState({ showForgotPassword: true })}
                      color="primary"
                      size="small"
                    >
                      Forgot password?
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => this.props.history.push('/createUser')} color="primary" size="small">
                      {"Sign Up"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}
