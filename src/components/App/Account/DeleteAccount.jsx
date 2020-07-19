import React, { useState } from "react";
import { Typography, Paper, Button, Grid, TextField } from "@material-ui/core";
import Modal from "../../Common/Modal";
import { toast } from "react-toastify";
import { deleteUser as deleteUserPlease } from "../../../services";
import { withRouter } from "react-router";
import { auth } from "../../../services/firebase";
import account from '../../../assets/profile.svg';

const DeleteAccount = ({
  showDeleteUserModal,
  setShowDeleteUserModal,
  uid,
  setUser,
}) => {
  const [deleteUserText, setDeleteUserText] = useState("");
  const [deleteUserTextErr, setDeleteUserTextErr] = useState(false);

  const deleteUserTextValidation = () => {
    setDeleteUserTextErr(false);
    if (deleteUserText.toUpperCase() === "DELETE") {
      return true;
    } else {
      setDeleteUserTextErr(true);
      return false;
    }
  };

  const deleteUser = async () => {
    if (deleteUserTextValidation()) {
      await deleteUserPlease(uid)
        .then((res) => {
          toast.success("Account deleted successfully");
          setUser(null);
        })
        .catch((err) => {
          console.error("Account not deleted successfully.", err);
          toast.error(
            "We were unable to delete your acount at this time. Please try again later"
          );
        });
    }
  };

  return (
    <Modal
      open={showDeleteUserModal}
      onClose={() => setShowDeleteUserModal(false)}
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
            Delete Account
          </Typography>
          <div className="max-w-sm mx-auto">
            <img
              className="mb-5"
              src={account}
              alt="more features coming soon"
            />
          </div>
          <Typography className="mt-2" component="p" variant="body1">
            You are about to delete your account. Please type
            <Typography
              color="primary"
              className="mt-2"
              component="span"
              variant="body1"
            >
              {" DELETE "}
            </Typography>
            to proceed.
          </Typography>
          <TextField
            className="my-4"
            variant="outlined"
            margin="normal"
            id="deleteUser"
            name="delete-user"
            value={deleteUserText}
            onChange={(e) => setDeleteUserText(e.target.value.toUpperCase())}
            helperText={
              deleteUserTextErr && "The text didn't match the word DELETE"
            }
            fullWidth
            error={deleteUserTextErr ? true : false}
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={deleteUser}
          >
            Delete Account
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default withRouter(DeleteAccount);
