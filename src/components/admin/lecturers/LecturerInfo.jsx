import React from "react";

const LecturerInfo = ({ lecturer }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10 space-y-4">
      <h2 className="text-xl font-bold text-blue-600">Thông tin giảng viên</h2>
      <div>
        <strong>Tên đăng nhập:</strong> {lecturer.userName}
      </div>
      <div>
        <strong>Email:</strong> {lecturer.email}
      </div>
      <div>
        <strong>Mã giảng viên:</strong> {lecturer.lecturerCode}
      </div>
      <div>
        <strong>Ngày đăng ký:</strong>{" "}
        {lecturer?.hireDate
          ? new Date(lecturer.hireDate).toLocaleDateString("vi-VN")
          : "N/A"}
      </div>
    </div>
  );
};

export default LecturerInfo;
