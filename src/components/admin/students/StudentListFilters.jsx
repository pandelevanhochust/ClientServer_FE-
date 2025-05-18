import React from "react";

const StudentListFilters = ({
  searchText,
  handleSearchChange,
  handleAddStudent,
}) => {

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Nhập tên hoặc MSSV"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueblue-500"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={handleAddStudent}
        >
          Thêm 
        </button>
    </div>
  );
};

export default StudentListFilters;
