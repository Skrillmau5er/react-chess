import React, { Children } from "react";
import {
  Modal as ModalBase,
  Fade,
  Backdrop,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import "../../../styles/Common/Modal.scss";

const Modal = ({ open, onClose, children }) => {
  return (
    <ModalBase
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="modal">
          <IconButton
            aria-label="close modal"
            size="small"
            className="close-modal-button"
            onClick={onClose}
          >
            <ClearIcon />
          </IconButton>
          {Children.only(children)}
        </div>
      </Fade>
    </ModalBase>
  );
};

export default Modal;
