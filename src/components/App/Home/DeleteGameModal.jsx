import React from "react";
import { Typography, Paper, Button, Grid } from "@material-ui/core";
import Modal from "../../Common/Modal";

const DeleteGameModal = ({
  showDeleteGameModal,
  setShowDeleteGameModal,
  deleteGame
}) => {
  return (
    <Modal
      open={showDeleteGameModal}
      onClose={() => setShowDeleteGameModal(false)}
    >
      <Grid
        container
        component={Paper}
        elevation={6}
        alignContent="center"
        className="p-6"
      >
        <Grid item xs={12}>
          <Typography component="p" variant="h4" color="primary">
            Forfeit Game?
          </Typography>
          <Typography className="mt-2" component="p" variant="body1">
            You are about to forfeit your game with person. Forfeits will count
            as a loss in your stats.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-2"
            onClick={deleteGame}
          >
            Forfeit Game
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DeleteGameModal;
