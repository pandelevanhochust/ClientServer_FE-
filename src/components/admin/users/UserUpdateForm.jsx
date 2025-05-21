import React, { useState } from "react";
import axios from "axios";
import env from "../../../config/env.js";
import token from "../../../config/token.js";

const UserUpdateForm = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.userName || "",
    email: user.email || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.put(`${env.BE_API_PATH}/Admin/update-user/${user.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.BE_TOKEN}`,
        },
      });
      onSuccess(response.data);
    } catch (err) {
      setError(err?.response?.data?.Message || "Cập nhật thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block font-medium mb-1">Tên đăng nhập</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
