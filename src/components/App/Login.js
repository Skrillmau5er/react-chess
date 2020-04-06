import React, { Component } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  LinearProgress,
  Link,
  Paper,
  Grid,
  Typography,
  Modal
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import '../../styles/App/Login.scss';
import { toast } from 'react-toastify';
import { auth, provider } from '../../services/firebase';
import googleIcon from '../../assets/google-icon.png';
import chessIcon from '../../assets/pawn-black.png';

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
    showForgotPassword: false
  };

  validate = () => {
    let validationPassed = true;
    const { email, password } = this.state;

    this.setState({
      emailErr: null,
      passwordErr: null
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

  forgotPassword = e => {
    const { emailForgot } = this.state;
    e.preventDefault();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForgot)) {
      this.setState({ isLoadingForgot: true });
      auth
        .sendPasswordResetEmail(emailForgot)
        .then(() => {
          toast.success('A email has been sent to you to reset your password.');
        })
        .catch(err => {
          toast.error(`There was an error. ${err}`);
        })
        .finally(() => {
          this.setState({ isLoadingForgot: false, showForgotPassword: false });
        });
    } else {
      this.setState({ emailForgotErr: 'Not a valid email' });
    }
  };

  login = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;

    if (this.validate()) {
      this.setState({
        isLoading: true,
        displayError: false
      });
      auth.signInWithEmailAndPassword(email, password).catch(err => {
        this.setState({
          isLoading: false
        });
        toast.error('Sign in falied');
        console.log(err);
      });
    }
  };

  signInWithGoogle = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    auth.signInWithPopup(provider);
  };

  render() {
    const {
      isLoading,
      isLoadingForgot,
      displayError,
      emailErr,
      emailForgotErr,
      showForgotPassword,
      passwordErr
    } = this.state;
    return (
      <>
        {isLoading && <LinearProgress style={{ height: '5px' }} />}
        <Modal open={showForgotPassword} onClose={this.closeForgotPassword}>
          <div className='forget-password-container'>
            <Grid container component={Paper} elevation={6} alignContent='center' spacing={6}>
              <Grid item xs={12}>
                <Typography component='h1' variant='h5'>
                  Forgot Password
                </Typography>
                <TextField
                  variant='outlined'
                  margin='normal'
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={e => this.setState({ emailForgot: e.target.value })}
                  helperText={emailForgotErr}
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
                  onClick={e => this.forgotPassword(e)}
                >
                  Send Forgot Password Email
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
        <Grid className='login-grid-container' container component='main'>
          <CssBaseline />
          <Grid item className='login-image-grid' xs={false} sm={4} md={7} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className='login-item-container'>
              {/* <img src={this.props.isInternal ? ybaLogo : cspLogoOnly} className="yba-logo"/> */}
              <img src={chessIcon} className='chess-icon'/>
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
                  onChange={e => this.change(e, 'email')}
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
                  onChange={e => this.change(e, 'password')}
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
                  onClick={e => this.login(e)}
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
                  onClick={e => this.signInWithGoogle(e)}
                >
                  <img className='google-icon' src={googleIcon} alt='google-icon' />
                  Sign In With Google
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => this.setState({ showForgotPassword: true })}
                      variant='body2'
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='/createUser' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
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
