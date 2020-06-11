import axios from 'axios';
let root;
  root = 'http://localhost:9000';
  // root = 'https://quick-chess-2020-273416.appspot.com';


export const getGame = async id => {
  return await axios.get(`${root}/game/${id}`);
};

export const getAllUsers = async () => {
  return await axios.get(`${root}/user/getAll`);
};

export const createUser = async data => {
  return await axios.post(`${root}/user/create`, data);
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

export const sendInvite = async data => {
  return await axios.post(`${root}/game/sendInvite`, data);
};
