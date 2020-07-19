import React from "react";
import CurrentGames from "./CurrentGames";
import CreateGame from "./CreateGame";
import { Typography } from "@material-ui/core";
import gameRetro from "../../../assets/video-game-retro.svg";

const Home = ({ history, user }) => {
  return (
    <div className="home-page mx-5">
      <Typography className="text-center my-4" variant="h2">
        Quick Chess
      </Typography>
      <div className="max-w-sm mx-auto">
        <img
          className="mb-5"
          src={gameRetro}
          alt="more features coming soon"
        />
      </div>
      <CreateGame player={user} />
      <CurrentGames history={history} uid={user.uid} />
    </div>
  );
};

export default Home;
