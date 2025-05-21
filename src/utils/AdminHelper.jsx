import axios from "axios";
import env from "../config/env.js";
import token from "../config/token.js";

export const getAllUsers = async () => {
  let users;
  try {
    const response = await axios.get(`${env.BE_API_PATH}/Admin/list-user`, {
      headers: {
        Authorization: `Bearer ${token.BE_TOKEN}`,
      },
    });
    if (response.status === 200) {
      users = response.data.$values;
    }
  } catch (err) {
    alert(err.response.data.Message || "Không thể lấy danh sách người dùng");
  }
  return users;
};

export const getDefaultUsers = async () => {
  let defaultUsers;
  try {
    const response = await axios.get(
      `${env.BE_API_PATH}/User/get-defualt-user`,
      {
        headers: {
          Authorization: `Bearer ${token.BE_TOKEN}`,
        },
      }
    );
    if (response.status === 200) {
      defaultUsers = response.data.$values;
    }
  } catch (err) {
    alert(err.response.data.Message || "Không thể lấy thông tin người dùng");
  }
  return defaultUsers;
};

export const getAllStudents = async () => {
  let users;
  try {
    const response = await axios.get(`${env.BE_API_PATH}/Admin/list-student`, {
      headers: {
        Authorization: `Bearer ${token.BE_TOKEN}`,
      },
    });
    if (response.status === 200) {
      users = response.data.$values;
    }
  } catch (err) {
    alert(err.response.data.Message || "Không thể lấy danh sách sinh viên");
  }
  return users;
};

export const getAttendancesList = async () => {
  let attendanceList;
  try {
    const response = await axios.get(
      `${env.BE_API_PATH}/Attendance/list-attendance`,
      {
        headers: {
          Authorization: `Bearer ${token.BE_TOKEN}`,
        },
      }
    );
    if(response.status === 200){
      attendanceList = response.data.$values
    } else {
      return []
    }
  } catch (err) {
    alert(err.response.data.Message || "Không thể lấy danh sách điểm danh")
  }
  return attendanceList
};
