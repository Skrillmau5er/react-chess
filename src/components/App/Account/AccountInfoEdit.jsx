import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";

const AccountInfoEdit = ({ value, type, setNewValue, label, onCancel, onSubmit }) => {
  return (
    <div className="flex items-center">
      <TextField
        className="mr-2"
        variant="outlined"
        margin="normal"
        value={value}
        label={label}
        onChange={(e) => setNewValue(e.target.value)}
        fullWidth
        autoFocus
        // helperText={prevPasswordErr}
        type={type}
        // error={prevPasswordErr ? true : false}
      />
      <IconButton onClick={onCancel}>
        <CancelIcon />
      </IconButton>
      <IconButton onClick={onSubmit}>
        <DoneIcon />
      </IconButton>
    </div>
  );
};

export default AccountInfoEdit;
