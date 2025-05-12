import axios from "axios"; 

const API_PATH = import.meta.env.VITE_BE_API_PATH;

export const getAllUsers = async () => {
  let users;
  try {
    const response = await axios.get(`${API_PATH}/Admin/list-user`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (response) {
      users = response.data.$values;
    }
  } catch (err) {
    alert(err.response.data.message);
  }
  return users;
};