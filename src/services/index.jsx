import axios from "axios";
let root;
if (process.env.NODE_ENV === "development") {
  root = process.env.REACT_APP_API_URL;
} else {
  root = "https://quickchess.herokuapp.com";
}

export const getGame = async (id) => {
  return await axios.get(`${root}/game/${id}`);
};

export const getAllUsers = async () => {
  return await axios.get(`${root}/user/getAll`);
};

export const createUser = async (data) => {
  return await axios.post(`${root}/user/create`, data);
};

export const createGame = async (data) => {
  return await axios.post(`${root}/game/create`, data);
};

export const getGamesByUser = async (user) => {
  return await axios.get(`${root}/game/getByUser/${user}`);
};

export const deleteGame = async (gameID, uid) => {
  return await axios.put(`${root}/game/delete/${gameID}/${uid}`);
};

export const updateGame = async (data) => {
  return await axios.put(`${root}/game/update`, data);
};

export const setGameOver = async (data) => {
  return await axios.put(`${root}/game/gameOver`, data);
};

export const sendInvite = async (data) => {
  return await axios.post(`${root}/game/sendInvite`, data);
};

export const deleteUser = async (uid) => {
  return await axios.delete(`${root}/user/delete`, { params: { uid: uid } });
};

export const getStats = async (uid) => {
  return await axios.get(`${root}/stats/${uid}`);
};

export const getUser = async (uid) => {
  return await axios.get(`${root}/user/${uid}`);
};
