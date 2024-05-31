import axios from "axios";

const url = "http://test-three-kappa-79.vercel.app/";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data);
  } catch (error) {
    console.log("error while addUser API", error.message);
  }
};

export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log("error while calling getUsers api", error.message);
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put(`${url}/editusers`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while calling updateUserProfile API:", error.message);
    throw error;
  }
};
