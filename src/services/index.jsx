import axios from 'axios';
let root = 'https://quick-chess-2020-273416.appspot.com/8080';

export const getGame = async id => {
  return await axios.get(`${root}/game/${id}`);
};

export const getAllUsers = async () => {
  return await axios.get(`${root}/users`);
};

export const createUser = async data => {
  return await axios.post(`${root}/users`, data);
};

export const createGame = async data => {
  return await axios.post(`${root}/game/create`, data);
};

export const getGamesByUser = async user => {
  return await axios.get(`${root}/game/getByUser/${user}`);
};

export const deleteGame = async gameID => {
  return await axios.put(`${root}/game/delete/${gameID}`);
};

export const updateGame = async data => {
  return await axios.put(`${root}/game/update`, data);
};

export const setGameOver = async data => {
  return await axios.put(`${root}/game/gameOver`, data);
};

export const sendGameInvite = async data => {
  return await axios.post(`${root}/game/sendInvite`, data);
};
