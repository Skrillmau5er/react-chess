import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  CardActionArea,
  Grid,
  Button,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "../../../styles/App/CurrentGames.scss";
import { Skeleton } from "@material-ui/lab";
import { toast } from "react-toastify";
import { getGamesByUser, deleteGame as deleteGameById } from "../../../services";
import moment from "moment";
import DeleteGameModal from './DeleteGameModal';

const CurrentGames = ({ history, uid }) => {
  const [games, setGames] = useState(null);
  const [showDeleteGameModal, setShowDeleteGameModal] = useState(false);
  const [game, setGame] = useState(null);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    getGamesByUser(uid)
      .then((res) => {
        setGames(orderGames(res.data));
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const orderGames = (games) => {
    return games.sort((a) => (getTurn(a.gameData) ? -1 : 1));
  };

  const formatLastMove = (lastMove) => {
    let diff = moment.duration(moment.now() - moment(lastMove), "milliseconds");
    return `${Math.floor(diff.asHours())} hours`;
  };

  const deleteGame = () => {
    let players = game.gameData.players;
    let winner = players[0] === uid ? players[1] : players[0];
    deleteGameById(game.gameID, winner)
      .then((res) => {
        getGames();
        toast.success("Game Successfully deleted");
        setShowDeleteGameModal(false);
      })
      .catch((err) => {
        toast.error("Error Deleting Game", err);
      });
  };

  const getPlayerName = (gameData) => {
    return uid === gameData.player1.uid
      ? gameData.player2.name
      : gameData.player1.name;
  };

  const getTurn = (gameData) => {
    let turn = gameData.turn;
    let playerNum = gameData.player1.uid === uid ? 1 : 2;
    return turn === playerNum;
  };

  return (
    <div className="current-games-container">
      <Typography variant="h4" className="text-center mb-3">Current Games</Typography>
      <Grid container spacing={1}>
        {games ? (
          <>
          <DeleteGameModal 
            showDeleteGameModal={showDeleteGameModal}
            setShowDeleteGameModal={setShowDeleteGameModal}
            deleteGame={deleteGame}
          />
          {games.map((game) => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card className="game-card my-3" key={game.gameID}>
                  <CardActionArea
                    className="game-card-action-area"
                    onClick={() => history.push(`/game/${game.gameID}`)}
                  >
                    <CardContent className="game-card-content">
                      <Typography color="textSecondary" gutterBottom>
                        Game with {getPlayerName(game.gameData)}
                      </Typography>
                      <div className="game-card-turn-area">
                        {getTurn(game.gameData) ? (
                          <Typography color="primary">
                            <strong>Its your turn</strong>
                          </Typography>
                        ) : (
                          <Typography>It's their turn</Typography>
                        )}
                        {game.gameData.lastMove && (
                          <Typography className="font-xs align-right">
                            Last Move {formatLastMove(game.gameData.lastMove)}{" "}
                            ago
                          </Typography>
                        )}
                      </div>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="game-card-actions">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => history.push(`/game/${game.gameID}`)}
                    >
                      Play
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setShowDeleteGameModal(true);
                        setGame(game);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          </>
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Skeleton
                height={130}
                className="game-skeleton m-3"
                variant={"rect"}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Skeleton
                height={130}
                className="game-skeleton m-3"
                variant={"rect"}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Skeleton
                height={130}
                className="game-skeleton m-3"
                variant={"rect"}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Skeleton
                height={130}
                className="game-skeleton m-3"
                variant={"rect"}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CurrentGames;
