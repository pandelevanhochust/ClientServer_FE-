import axios from "axios"; 
import env from "../config/env.js";

export const getAllUsers = async () => {
  let users;
  try {
    const response = await axios.get(`${env.BE_API_PATH}/Admin/list-user`, {
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