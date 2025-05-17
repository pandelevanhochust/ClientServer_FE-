import React from "react";

const UserInfo = ({ user }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Thông tin người dùng
      </h2>
      <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden mb-8 bg-white">
        <tbody>
          <tr className="even:bg-gray-50 border-b">
            <td className="p-3 font-semibold text-gray-700">Tên đăng nhập</td>
            <td className="p-3 text-gray-800">{user.userName}</td>
          </tr>
          <tr className="even:bg-gray-50 border-b">
            <td className="p-3 font-semibold text-gray-700">Họ và tên</td>
            <td className="p-3 text-gray-800">{user.fullName}</td>
          </tr>
          <tr className="even:bg-gray-50 border-b">
            <td className="p-3 font-semibold text-gray-700">Số CCCD</td>
            <td className="p-3 text-gray-800">{user.idNumber}</td>
          </tr>
          <tr className="even:bg-gray-50 border-b">
            <td className="p-3 font-semibold text-gray-700">Email</td>
            <td className="p-3 text-gray-800">{user.email}</td>
          </tr>
          <tr className="even:bg-gray-50 border-b">
            <td className="p-3 font-semibold text-gray-700">Vai trò</td>
            <td className="p-3 text-gray-800">
              {user.userRoles?.$values?.map((role, index) => (
                <span key={index}>
                  {role.roleName}
                  {index < user.userRoles.$values.length - 1 ? ", " : ""}
                </span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-8 mb-8">
        <div className="text-center">
          <p className="font-medium text-gray-700 mb-1">Ảnh khuôn mặt</p>
          <img
            src={user.faceImage ? user.faceImage : "../../../public/images/faceImage.jpg"}
            alt="Ảnh khuôn mặt"
            className="w-80 h-80 object-cover rounded-md border"
          />
        </div>
        <div className="text-center">
          <p className="font-medium text-gray-700 mb-1">Ảnh vân tay</p>
          <img
            src={user.fingerprintImage ? user.fingerprintImage : "../../../public/images/fingerprintImage.png"}
            alt="Ảnh vân tay"
            className="w-80 h-80 object-cover rounded-md border"
          />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
