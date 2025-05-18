import React from "react";

const StudentInfo = ({ student }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10 space-y-4">
      <h2 className="text-xl font-bold text-blue-600">Thông tin sinh viên</h2>
      <div>
        <strong>Tên đăng nhập:</strong> {student.userName}
      </div>
      <div>
        <strong>Email:</strong> {student.email}
      </div>
      <div>
        <strong>Mã sinh viên:</strong> {student.studentCode}
      </div>
      <div>
        <strong>Ngày đăng ký:</strong>{" "}
        {student?.enrollDate
          ? new Date(student.enrollDate).toLocaleDateString("vi-VN")
          : "N/A"}
      </div>
    </div>
  );
};

export default StudentInfo;
