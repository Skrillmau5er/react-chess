import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { getStats } from "../../../services";
import inProgress from "../../../assets/undraw_under_construction_46pa.svg";
import {toast} from "react-toastify";

const GameStats = ({ user }) => {
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  useEffect(() => {
    setStatsData();
  }, []);

  const setStatsData = async () => {
    getStats(user.uid)
    .then(stats => {
      setTotalGames(stats.data.length);
      getWinsAndLosses(stats.data);
    })
    .catch(err => {
      console.error(err);
      toast.error('Unable to get stats data at this time. Try again later');
    });
  };

  const getWinsAndLosses = data => {
    let losses = 0;
    let wins = 0;
    data.forEach(game => {
      if(game.winner) {
        if(game.winner === user.uid) {
          wins += 1;
        } else {
          losses +=1;
        }
      }
    });
    setWins(wins);
    setLosses(losses);
  };

  return (
    <div className="stats-page-container mx-5">
      <Typography className="text-center mb-5" variant="h2">
        Game Stats
      </Typography>
      <Grid container className="mb-20" spacing={3}>
        <Grid item sm={12} md={4} className="text-center w-full">
          <Paper className="p-4 bg-bgColorLight" elevation={1}>
            <Typography variant="h4">Total Games</Typography>
            <Typography variant="h2" className="text-primary">{totalGames}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={4} className="text-center w-full">
          <Paper className="p-4 bg-bgColorLight" elevation={1}>
            <Typography variant="h4">Wins</Typography>
            <Typography variant="h2" className="text-primary">{wins}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={4} className="text-center w-full">
          <Paper className="p-4 bg-bgColorLight" elevation={1}>
            <Typography variant="h4">Losses</Typography>
            <Typography variant="h2" className="text-primary">{losses}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        variant="body1"
        component="div"
        className="text-center text-3xl mb-5"
      >
        More Features Coming Soon
      </Typography>
      <div className="max-w-sm mx-auto">
        <img
          className="mb-5"
          src={inProgress}
          alt="more features coming soon"
        />
      </div>
    </div>
  );
};

export default GameStats;
