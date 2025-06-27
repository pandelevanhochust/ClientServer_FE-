import React, {useState} from 'react'
import axios from 'axios';
import env from "../../../config/env.js"
import { getBeToken } from '../../../config/token.js';

const LecturerUpdateForm = ({ lecturer, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    newLecturereCode: lecturer.lecturerCode || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData)
    try {
      const response = await axios.put(`${env.BE_API_PATH}/Admin/update-lecturer/${lecturer.userId}`, formData, {
        headers: {
          "Authorization": `Bearer ${getBeToken()}`,
        },
      });
      onSuccess(response.data.message);
    } catch (err) {
        console.log(err)
      setError(err?.response?.data?.Message || "Cập nhật thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block font-medium mb-1">Mã số giảng viên mới</label>
        <input
          type="text"
          name="newLecturereCode"
          value={formData.newLecturereCode}
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

export default LecturerUpdateForm