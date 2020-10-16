import React, {useState} from "react";
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteGameModal from "../App/Home/DeleteGameModal";

const GameMenu = ({ deleteGame, history, toggleWhatIfMode, showGameMenu, setShowGameMenu, whatIfMode }) => {
  const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
  const [gameMenuEl, setGameMenuEl] = useState(null);

  const handleMenuClick = (event) => {
    setGameMenuEl(event.currentTarget);
    setShowGameMenu(true);
  };

  return (
    <div className="flex justify-between">
      <DeleteGameModal
        showDeleteGameModal={showDeleteGameModal}
        setShowDeleteGameModal={setShowDeleteGameModal}
        deleteGame={deleteGame}
      />
      <IconButton
        aria-label="exit game"
        className="m-3 ml-4"
        onClick={() => history.push("/")}
      >
        <ArrowBack className="font-xl" />
      </IconButton>
      <IconButton
        id="gameMenu"
        aria-label="game options"
        className="m-3 ml-4"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={gameMenuEl}
        keepMounted
        open={Boolean(showGameMenu)}
        onClose={() => setShowGameMenu(false)}
      >
        <MenuItem onClick={toggleWhatIfMode}>{whatIfMode ? "Turn off What If Mode" : "Enable What If Mode"}</MenuItem>
        <MenuItem onClick={() => setShowDeleteGameModal(true)}>
          Forfeit Game
        </MenuItem>
        <MenuItem onClick={() => history.push("/")}>Exit</MenuItem>
      </Menu>
    </div>
  );
};

export default GameMenu;
