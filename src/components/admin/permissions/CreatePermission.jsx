import React, { useEffect, useState } from "react";
import { getAllDevices, getAllUsers } from "../../../utils/AdminHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../../../config/env";
import { getBeToken } from "../../../config/token";

const CreatePermission = () => {
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    userIds: [],
    deviceIds: [],
    timeStart: "",
    timeEnd: "",
  });

  const fetchData = async () => {
    const [devices, users] = await Promise.all([
      getAllDevices(99, 0), //Please check params in AdminHelper.jsx
      getAllUsers(),
    ]);
    setDevices(devices);
    setUsers(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.userIds.length ||
      !formData.deviceIds.length ||
      !formData.timeStart ||
      !formData.timeEnd
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin phân quyền.");
      return;
    }
    try {
        console.log(formData)
      const response = await axios.post(
        `${env.BE_API_PATH}/Permission/create-permission`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Phân quyền thành công!");
        navigate("/admin-dashboard/permissions");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Có lỗi khi phân quyền");
    }
  };

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
          Phân quyền
        </h2>
        {errorMessage && (
          <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded border border-red-300 mb-4">
            ⚠️ {errorMessage}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Chọn người dùng
        </label>

        {/* Thẻ người dùng đã chọn */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.userIds.map((id) => {
            const user = users.find((s) => s.id === id);
            if (!user) return null;
            return (
              <div
                key={id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {user.userName}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      studentIds: formData.studentIds.filter(
                        (sid) => sid !== id
                      ),
                    })
                  }
                  className="ml-2 text-blue-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Danh sách người dùng chưa chọn */}
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && !formData.userIds.includes(selectedId)) {
              setFormData({
                ...formData,
                userIds: [...formData.userIds, selectedId],
              });
            }
            e.target.value = "";
          }}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="" key="default-student">
            -- Chọn người dùng --
          </option>
          {users
            .filter((user) => !formData.userIds.includes(user.id))
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.userName} ({user.email})
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn thiết bị</label>

        {/* Thẻ thiết bị đã chọn */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.deviceIds.map((id) => {
            const device = devices.find((s) => s.id.id === id);
            if (!device) return null;
            return (
              <div
                key={id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {device.type}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      deviceIds: formData.deviceIds.filter((sid) => sid !== id),
                    })
                  }
                  className="ml-2 text-blue-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Danh sách thiết bị chưa chọn */}
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && !formData.deviceIds.includes(selectedId)) {
              setFormData({
                ...formData,
                deviceIds: [...formData.deviceIds, selectedId],
              });
            }
            e.target.value = "";
          }}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="" key="default-student">
            -- Chọn thiết bị --
          </option>
          {devices
            .filter((device) => !formData.deviceIds.includes(device.id.id))
            .map((device) => (
              <option key={device.id.id} value={device.id.id}>
                {device.type} ({device.label || "N/A"})
              </option>
            ))}
        </select>
      </div>
      <div className="flex items-center gap-10 flex-wrap ">
        <div>
          <label className="block text-sm font-medium">Ngày bắt đầu</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.timeStart}
            onChange={(e) =>
              setFormData({ ...formData, timeStart: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Ngày kết thúc</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.timeEnd}
            onChange={(e) =>
              setFormData({ ...formData, timeEnd: e.target.value })
            }
            min={formData.timeStart}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lập lịch phân quyền
        </button>
      </div>
    </form>
  );
};

export default CreatePermission;
