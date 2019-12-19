import axios from 'axios';

const newGame = gameData => {
  return axios.post('/creategame', gameData);
};

export default newGame;