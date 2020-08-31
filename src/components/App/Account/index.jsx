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
import { storage } from "../../../services/firebase";
import { toast } from "react-toastify";
import AccountInfoSection from "./AccountInfoSection";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";
import AccountInfoEdit from "./AccountInfoEdit";

const Account = ({ user, setUser }) => {
  const [avatar, setAvatar] = useState();
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [editing, setEditing] = useState(null);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setAvatar(user.photoURL);
    user.providerData.forEach((x) => {
      if (x.providerId === "password") {
        setShowChangePassword(true);
      }
    });
  }, []);

  const updateUserDisplayName = () => {
      user
        .updateProfile({
          displayName: displayName,
        })
        .then(
          () => {
            let newName = user.displayName;
            setEditing(null);
            setDisplayName(newName);
          },
          (error) => {
            toast.error(error.message);
          }
        );
  };

  const updateUserEmail = () => {
    user.updateEmail(email)
    .then(
      () => {
        console.log(user);
        setEditing(null);
      },
      (error) => {
        toast.error(error.message);
      }
    );
  };

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

  const onCancelEdit = () => {
    setEditing(null);
    setDisplayName(user.displayName);
    setEmail(user.email);
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
            {editing === "displayName" ? (
              <AccountInfoEdit
                value={displayName}
                type="name"
                setNewValue={setDisplayName}
                label="Change your Display Name"
                onCancel={onCancelEdit}
                onSubmit={updateUserDisplayName}
              />
            ) : (
              <AccountInfoSection
                label="Display Name"
                value={user.displayName}
                onEdit={() => setEditing("displayName")}
                disabled={editing && editing !== "displayName"}
              />
            )}
            {editing === "email" ? (
              <AccountInfoEdit
                value={email}
                type="email"
                setNewValue={setEmail}
                label="Change your Email"
                onCancel={onCancelEdit}
                onSubmit={updateUserEmail}
              />
            ) : (
              <AccountInfoSection
                label="Email"
                value={user.email}
                onEdit={() => setEditing("email")}
                disabled={editing && editing !== "email"}
              />
            )}
          </div>
          <div className="account-action-area mt-5">
            {showChangePassword && (
              <>
                <Button
                  color="secondary"
                  onClick={() => setShowChangePasswordModal(true)}
                >
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
