import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const AccountInfoSection = ({ label, value, onEdit, disabled }) => {
  return (
    <div className="mb-3">
      <Typography variant="button" color="primary">
        {label}
      </Typography>
      <div className="edit-line">
        <Typography variant="h5">{value}</Typography>
        <IconButton size="small" className="ml-2" onClick={onEdit} disabled={disabled}>
          <EditRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AccountInfoSection;
