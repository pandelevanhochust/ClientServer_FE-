import React, { useState } from "react";
import axios from "axios";
import env from "../../../config/env";
import token from "../../../config/token";

const UpdateAttendanceForm = ({ attendance, onSuccess, onCancel, lecturers, students, devices }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    lecturerId: attendance.lecturer.userId,
    studentIds: attendance.student.$values.map(
      (student) => student.student.userId
    ),
    deviceId: attendance.deviceId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData)

    try {
      const response = await axios.put(
        `${env.BE_API_PATH}/Attendance/update-attendance/${attendance.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.BE_TOKEN}`,
          },
        }
      );
      onSuccess(response.data.message);
    } catch (err) {
      console.log(err)
      setError(err?.response?.data?.message || "Cập nhật thất bại");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-2">Chọn giảng viên</label>
        <select
          value={formData.lecturerId}
          onChange={(e) =>
            setFormData({ ...formData, lecturerId: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="" key="default-lecturer">
            -- Chọn --
          </option>
          {lecturers.map((lecturer) => (
            <option key={lecturer.userId} value={lecturer.userId}>
              {lecturer.userName} ({lecturer.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn sinh viên</label>

        {/* Thẻ sinh viên đã chọn */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.studentIds.map((id) => {
            const student = students.find((s) => s.userId === id);
            if (!student) return null;
            return (
              <div
                key={id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {student.userName}
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

        {/* Danh sách sinh viên chưa chọn */}
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && !formData.studentIds.includes(selectedId)) {
              setFormData({
                ...formData,
                studentIds: [...formData.studentIds, selectedId],
              });
            }
            e.target.value = "";
          }}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="" key="default-student">
            -- Chọn sinh viên --
          </option>
          {students
            .filter((student) => !formData.studentIds.includes(student.userId))
            .map((student) => (
              <option key={student.userId} value={student.userId}>
                {student.userName} ({student.email})
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn thiết bị</label>
        <select
          value={formData.deviceId}
          onChange={(e) =>
            setFormData({ ...formData, deviceId: e.target.value })
          }
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="" key="default-device">
            -- Chọn --
          </option>
          {devices.map((device) => (
            <option key={device.id.id} value={device.id.id}>
              {device.label || "(N/A)"}
            </option>
          ))}
        </select>
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

export default UpdateAttendanceForm;
