import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { sendGameInvite } from '../../services';

import chessIcon from '../../assets/pawn-black.png';
import '../../styles/Game/GameSetup.scss';

const GameSetup = props => {
  const [email, setEmail] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      validate();
    }
  }, [email]);

  const validate = () => {
    let validationPassed = true;

    setEmailErr(null);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validationPassed = false;
      setEmailErr('Not a valid email');
    }
    return validationPassed;
  };

  const sendEmail = () => {
    setSubmitted(true);
    if (validate()) {
      setIsLoading(true);
      sendGameInvite({email})
      .then(res => {
        toast.success(res.data);
        console.log(res);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        toast.error('OH no. Email could not be sent');
      })
    }
  };

  const changeEmail = event => {
    setEmail(event.target.value);
  };

  return (
    <div className='setup-game-area'>
      <div className='login-item-container'>
        <img src={chessIcon} className='chess-icon' />
        <Typography component='h1' variant='h5'>
          Invite a friend
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          onChange={e => changeEmail(e)}
          helperText={emailErr}
          error={emailErr ? true : false}
          autoFocus
        />
        <Button
          className='submit-login'
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={isLoading}
          onClick={sendEmail}
        >
          Send Game Request
        </Button>
      </div>
    </div>
  );
};

export default GameSetup;
