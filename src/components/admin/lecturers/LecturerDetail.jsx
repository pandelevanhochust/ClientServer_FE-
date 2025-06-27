import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import env from '../../../config/env';
import { getBeToken } from '../../../config/token.js';
import LecturerInfo from './LecturerInfo.jsx';
import LecturerUpdateForm from './LecturerUpdateForm.jsx';

const LecturerDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchLecturer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${env.BE_API_PATH}/Lecturer/lecturer/${userId}`, {
        headers: {
          Authorization: `Bearer ${getBeToken()}`,
        },
      });
      setLecturer(response.data);
    } catch (err) {
      alert(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLecturer();
  }, [userId]);

  const handleUpdateSuccess = (updatedLecturer) => {
    setLecturer(updatedLecturer);
    setEditMode(false);
    fetchLecturer();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Đang tải...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
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
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Chỉnh sửa
          </button>
        )}
      </div>

      {editMode ? (
        <LecturerUpdateForm
          lecturer={lecturer}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <LecturerInfo lecturer={lecturer} />
      )}
    </div>
  );
}

export default LecturerDetail