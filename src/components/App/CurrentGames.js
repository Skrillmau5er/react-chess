import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  CardActionArea,
  Grid
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import '../../styles/App/CurrentGames.scss';

const CurrentGames = ({ games, deleteGame, history }) => {
  return (
    <div className='current-games-container'>
      <Grid container spacing={1}>
        {games.map(game => {
          return (
            <Grid item>
              <Card className='game-card' key={game.gameID}>
                <CardActionArea className='game-card-action-area' onClick={() => history.push(`/game/${game.gameID}`)}>
                  <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      Game: {game.gameID}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton size='small' onClick={() => deleteGame(game.gameID)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CurrentGames;
