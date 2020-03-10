import axios from 'axios';
let root = 'http://localhost:9000';

const getGame = async () => {
  return await axios.get(`${root}/game`);
};

export default getGame;