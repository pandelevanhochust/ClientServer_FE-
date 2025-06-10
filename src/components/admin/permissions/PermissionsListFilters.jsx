import React from "react";

const PermissionListFilters = ({
  filterStartDate,
  filterEndDate,
  onStartDateChange,
  onEndDateChange,
  handleAddPermission,
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStartDate}
          onChange={onStartDateChange}
        />

        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterEndDate}
          onChange={onEndDateChange}
        />
      </div>
      <div className="ml-auto">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={handleAddPermission}
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

export default PermissionListFilters;
