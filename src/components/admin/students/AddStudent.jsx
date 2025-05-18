import React, { useEffect, useState } from "react";
import { getDefaultUsers } from "../../../utils/AdminHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../../../config/env.js";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [enrollDate, setEnrollDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; 
    setEnrollDate(today);
  }, []);

  const fetchDefaultUsers = async () => {
    setLoading(true);
    try {
      const defaultUsers = await getDefaultUsers();
      setDefaultUsers(defaultUsers);
    } catch (err) {
      alert(err.response?.data?.message || "Không thể lấy dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${env.BE_API_PATH}/Admin/create-student/${selectedUserId}`,
        {
          studentCode,
          enrollDate,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        alert(response.data.message);
        navigate(-1);
      }
    } catch (error) {
      alert(error.response?.data?.Message || "Đăng ký thất bại");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-20"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-600 flex-1">
          Thêm sinh viên
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium">Chọn người dùng</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="">-- Chọn --</option>
          {defaultUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Mã sinh viên</label>
        <input
          type="text"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ngày đăng ký</label>
        <input
          type="date"
          value={enrollDate}
          disabled
          className="border rounded px-3 py-2 w-full bg-gray-100 text-gray-700"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Thêm sinh viên
      </button>
    </form>
  );
};

export default AddStudent;
