import React, { useState } from "react";
import Modal from "../../Common/Modal";
import { Grid, Typography, TextField, Button, Paper } from "@material-ui/core";
import { emailAuthProvider, auth } from "../../../services/firebase";
import { toast } from "react-toastify";

const ChangePassword = ({
  user,
  setShowChangePasswordModal,
  showChangePasswordModal,
}) => {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [prevPasswordErr, setPrevPasswordErr] = useState(null);
  const [newPassword1Err, setNewPassword1Err] = useState(null);
  const [newPassword2Err, setNewPassword2Err] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let validationPassed = true;

    setPrevPasswordErr(null);
    setNewPassword1Err(null);
    setNewPassword2Err(null);

    if (!prevPassword) {
      validationPassed = false;
      setPrevPasswordErr("Please enter your current password");
    }
    if (!newPassword1) {
      validationPassed = false;
      setNewPassword1Err("Please enter a new password");
    } else if (newPassword1.length < 8) {
      validationPassed = false;
      setNewPassword1Err("Please enter a password atleast 8 characters long");
    }
    if (!newPassword2) {
      validationPassed = false;
      setNewPassword2Err("Please confirm your new password");
    } else if (newPassword2.length < 8) {
      validationPassed = false;
      setNewPassword2Err("Please enter a password atleast 8 characters long");
    }
    if (newPassword2 !== newPassword1) {
      validationPassed = false;
      setNewPassword2Err("Passwords don't match");
    }
    return validationPassed;
  };

  const closeModal = () => {
    setShowChangePasswordModal(false);
    setPrevPassword("");
    setNewPassword1("");
    setNewPassword2("");
    setPrevPasswordErr(null);
    setNewPassword1Err(null);
    setNewPassword2Err(null);
    setIsLoading(false);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      let credential = await emailAuthProvider.credential(
        auth.currentUser.email,
        prevPassword
      );
      await user
        .reauthenticateWithCredential(credential)
        .then(function () {
          user
            .updatePassword(newPassword1)
            .then(() => {
              closeModal();
              toast.success("Your password was successfully changed!");
            })
            .catch((err) => {
              console.log(err);
              toast.error(
                "We are having diffuculty changing your password. Please try again later."
              );
            });
        })
        .catch(function (error) {
          console.error(error);
          setPrevPasswordErr("That didn't match your current password");
        });
      setIsLoading(false);
    }
  };

  const sendForgotPasswordEmail = () => {
    auth
      .sendPasswordResetEmail(user.email)
      .then(() => {
        toast.success(
          `A email was sent to you at ${user.email}. Go to your email to reset your password`
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          `We were unable to send you an email to ${user.email} to reset your password. Please try again later.`
        );
      });
  };

  return (
    <Modal open={showChangePasswordModal} onClose={closeModal}>
      <Grid
        container
        component={Paper}
        elevation={6}
        alignContent="center"
        className="p-4"
      >
        <Grid item xs={12}>
          <Typography component="p" variant="h4" color="primary">
            Change Password
          </Typography>
          <Typography className="mt-2" component="p" variant="body1">
            Enter your current password followed by your new password. Passwords
            need to be atleast 8 characters long.
          </Typography>
          <form className="change-password-form">
            <TextField
              className="my-3"
              variant="outlined"
              margin="normal"
              id="oldPassword"
              name="old-password"
              value={prevPassword}
              label="Current Password"
              onChange={(e) => setPrevPassword(e.target.value)}
              helperText={prevPasswordErr}
              fullWidth
              disabled={isLoading}
              type="password"
              error={prevPasswordErr ? true : false}
              autoFocus
            />
            <TextField
              className="my-2"
              variant="outlined"
              margin="normal"
              id="newPassword1"
              name="new-password1"
              value={newPassword1}
              label="New Password"
              onChange={(e) => setNewPassword1(e.target.value)}
              helperText={newPassword1Err}
              fullWidth
              disabled={isLoading}
              type="password"
              error={newPassword1Err ? true : false}
              autoFocus
            />
            <TextField
              className="mb-4 mt-2"
              variant="outlined"
              margin="normal"
              id="newPassword2"
              name="new-password2"
              value={newPassword2}
              label="Confirm New Password"
              onChange={(e) => setNewPassword2(e.target.value)}
              helperText={newPassword2Err}
              fullWidth
              disabled={isLoading}
              type="password"
              error={newPassword2Err ? true : false}
              autoFocus
            />
            <Button
              className="mb-3"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              onClick={(e) => changePassword(e)}
            >
              Change Password
            </Button>
          </form>
          <Button
            onClick={() => sendForgotPasswordEmail()}
            color="primary"
            size="small"
          >
            Forgot password?
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ChangePassword;
