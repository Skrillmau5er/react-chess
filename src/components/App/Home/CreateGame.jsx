import React, { useState } from "react";
import { withRouter } from 'react-router';
import { Button, Grid, Typography, TextField, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import { createGame } from "../../../services";
import "../../../styles/App/create-game.scss";
import Modal from "../../Common/Modal";

const CreateGame = ({player, history}) => {
  const [email, setEmail] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    let validationPassed = true;

    setEmailErr(null);
    if (!/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validationPassed = false;
      setEmailErr("Not a valid email");
    }
    return validationPassed;
  };

  const startGame = async () => {
    if (validate()) {
      setSubmitted(true);
      try {
        await createGame({ player, email }).then((res) => {
          let gameID = res.data;
          history.push(`/game/${gameID}`);
        });
      } catch (err) {
        console.log(err);
        // toast.error(err.response.data);
      } finally {
        setSubmitted(false);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail(null);
    setEmailErr(null);
  };

  return (
    <div className="create-game-container text-center mb-6">
      <Button
        className="create-game-btn"
        type="submit"
        fullWidth
        variant="outlined"
        size="large"
        color="primary"
        disabled={submitted}
        onClick={() => setShowModal(true)}
      >
        Start Game
      </Button>
      <Modal open={showModal} onClose={closeModal}>
        <Grid
          container
          component={Paper}
          elevation={6}
          alignContent="center"
          className="p-6"
        >
          <Grid item xs={12}>
            <Typography component="p" variant="h4" color="primary">
              Start New Game
            </Typography>
            <Typography className="mt-2" component="p" variant="body1">
              Enter an email of a friend to send them an invitation to  game.
            </Typography>
            <TextField
              className="my-5"
              variant="outlined"
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              helperText={emailErr}
              fullWidth
              error={emailErr ? true : false}
              autoFocus
            />
            <Button
              className="submit-forgot-login"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={startGame}
              disabled={submitted}
            >
              Start Game
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default withRouter(CreateGame);
