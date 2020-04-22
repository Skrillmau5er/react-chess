import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import { createGame, getAllUsers, sendInvite } from '../../services';
import Autocomplete from '@material-ui/lab/Autocomplete';

import chessIcon from '../../assets/pawn-black.png';
import '../../styles/Game/CreateGameTile.scss';

const CreateGameTile = uid => {
  const [email, setEmail] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    getAllUserNames();
  }, []);

  useEffect(() => {
    if (submitted) {
      validate();
    }
  }, [email]);

  const getAllUserNames = async () => {
    let users = await getAllUsers();
    let newUserNames = [];
    users.data.map(user => {
      newUserNames.push(user.data.userName);
    })
    setUserNames(newUserNames);
  };

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
      sendInvite({ email })
        .then((res) => {
          toast.success(res.data);
          console.log(res);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          toast.error('OH no. Email could not be sent');
        });
    }
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeUserNameSelected = (event, value) => {
    setSelectedUserName(value);
  };

  const startGame = async () => {
    try {
      await createGame({player: uid.uid, userName: selectedUserName});
    } catch(err) {
      toast.error(err.response.data);
    }
  };

  return (
    <Grid container className='setup-game-grid'>
      <Paper className='setup-game-area'>
        {userNames && (
          <Grid item>
            <Typography component='h1' variant='h6'>
              Start a New Game 
            </Typography>
            <Autocomplete
              freeSolo
              id='userNameSelector'
              onChange={(event, value) => changeUserNameSelected(event, value)}
              options={userNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Enter a Username'
                  margin='normal'
                  variant='outlined'
                  // InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            <Button
              className='start-game-button'
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={isLoading}
              onClick={startGame}
            >
              Start Game
            </Button>
            <Typography component='h1' variant='h6'>
              Invite Friends
            </Typography>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='off'
              onChange={(e) => changeEmail(e)}
              helperText={emailErr}
              error={emailErr ? true : false}
              autoFocus
            />
            <Button
              className='send-invite-email'
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={isLoading}
              onClick={sendEmail}
            >
              Send Invite
            </Button>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
};

export default CreateGameTile;
