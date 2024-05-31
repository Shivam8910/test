import axios from "axios";

const url = "http://test-three-kappa-79.vercel.app/";

export const getLobbies = async () => {
  try {
    const response = await axios.get(`${url}/api/lobbies`);
    return response.data;
  } catch (error) {
    console.log("error while calling getLobbies api", error.message);
  }
};

export const createLobby = async (data) => {
  try {
    await axios.post(`${url}/api/lobbies`, data);
  } catch (error) {
    console.log("error while creating Lobby", error.message);
  }
};

export const addUserToLobby = async (data) => {
  try {
    await axios.put(`${url}/api/lobbies/addUser`, data);
  } catch (error) {
    console.log("error while adding user to lobby", error.message);
  }
};

export const deleteUserFromLobby = async (data) => {
  try {
    await axios.put(`${url}/api/lobbies/delUser`, data);
  } catch (error) {
    console.log("error while deleting user from lobby", error.message);
  }
};
