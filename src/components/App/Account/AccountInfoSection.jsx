import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const AccountInfoSection = ({ label, value, className }) => {
  return (
    <div className={`mb-3 ${className}`}>
      <Typography variant="button" color="primary">
        {label}
      </Typography>
      <div className="edit-line">
        <Typography variant="h5">{value}</Typography>
        <IconButton size="small" className="ml-2">
          <EditRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AccountInfoSection;
