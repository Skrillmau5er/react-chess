import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import "../../../styles/App/Account.scss";
import { storage, auth } from "../../../services/firebase";
import { toast } from "react-toastify";
import AccountInfoSection from "./AccountInfoSection";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";

const Account = ({ user, setUser }) => {
  const [avatar, setAvatar] = useState();
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    setAvatar(user.photoURL);
    user.providerData.forEach((x) => {
      if (x.providerId === "password") {
        setShowChangePassword(true);
      }
    });
  }, []);

  const uploadAvatarPhoto = () => {
    document.getElementById("fileButton").click();
  };

  const handleUploadChange = (e) => {
    if (e.target.files.length) {
      let image = e.target.files[0];
      const upload = storage
        .ref(`profile-photos/${user.uid}-prof-pic`)
        .put(image);
      upload.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("profile-photos")
            .child(`${user.uid}-prof-pic`)
            .getDownloadURL()
            .then((url) => {
              updateUserAvatar(url);
            });
        }
      );
    }
  };

  const updateUserAvatar = (url) => {
    user
      .updateProfile({
        photoURL: url,
      })
      .then(function () {
        user.reload();
        setAvatar(null);
        setAvatar(url);
        toast.success("Avatar Updated Successfully");
      })
      .catch(function (error) {
        toast.error("Avatar photo not uploaded successfully. Please try again");
        console.log(error);
      });
  };

  return (
    <div className="account-container m-3">
      <DeleteAccount
        showDeleteUserModal={showDeleteUserModal}
        setShowDeleteUserModal={setShowDeleteUserModal}
        uid={user.uid}
        setUser={setUser}
      />
      <Typography className="text-center mb-5" variant="h2" component="div">
        Account
      </Typography>
      <div className="account-info-container">
        <Paper className="account-info p-6" elevation={1}>
          <div className="avatar-container">
            <input
              id="fileButton"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleUploadChange}
              hidden
            />
            <Tooltip
              title="Change Avatar"
              TransitionComponent={Zoom}
              placement="right"
            >
              <IconButton
                className="change-avatar-button"
                onClick={uploadAvatarPhoto}
              >
                <Avatar className="avatar" src={avatar} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="personal-info">
            <AccountInfoSection label="Dislay Name" value={user.displayName} />
            <AccountInfoSection label="Email" value={user.email} />
          </div>
          <div className="account-action-area mt-5">
            {showChangePassword && (
              <>
                <Button color="secondary" onClick={() => setShowChangePasswordModal(true)}>
                  Change Password
                </Button>
                <ChangePassword
                  setShowChangePasswordModal={setShowChangePasswordModal}
                  showChangePasswordModal={showChangePasswordModal}
                  user={user}
                />
              </>
            )}
            <Button
              color="primary"
              onClick={() => setShowDeleteUserModal(true)}
            >
              Delete Account
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Account;
