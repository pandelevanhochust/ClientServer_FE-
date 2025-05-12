import React from "react";

const UserListFilters = ({
  searchtext,
  selectedRole,
  handleSearchChange,
  handleRoleChange,
  handleAddUser,
}) => {

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueblue-500"
          value={searchtext}
          onChange={handleSearchChange}
        />

        <select
          name="role"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueblue-500"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">Vai trò</option>
          <option value="Admin">Quản trị viên</option>
          <option value="Student">Sinh viên</option>
          <option value="Lecturer">Giảng viên</option>
          <option value="Default User">Khác</option>
        </select>
      </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={handleAddUser}
        >
          Thêm 
        </button>
    </div>
  );
};

export default UserListFilters;
