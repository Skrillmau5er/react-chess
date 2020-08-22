import React from "react";
import { Typography, Paper, Avatar } from "@material-ui/core";
// import BoardPiece from './BoardPiece';

const GameStatus = ({ user, totalMoves }) => {
  return (
    <div className="mt-8 max-w-md px-5 mx-auto">
      <Paper elevation={1} className="bg-bgColorLight p-4">
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <Typography variant="h6">Turn</Typography>
            <Avatar src={user && user.photoURL}></Avatar>
            <Typography className="pt-2">{user && user.displayName}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="h6" className="inline-block pr-2">Total Moves: </Typography>
            <Typography variant="h4" component="span" className="text-primary">{totalMoves}</Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default GameStatus;
