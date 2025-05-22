import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaCog,
  FaDesktop,
  FaFileAlt,
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaClipboardCheck,
} from "react-icons/fa";

const Sidebar = () => {
  const role = sessionStorage.getItem("role").toLowerCase();

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl">
      {/* Header */}
      <div className="bg-blue-500 h-16 flex items-center justify-center shadow-md">
        SCIC
      </div>

      {/* NavLinks */}
      <div className="space-y-3 mt-4">
        <NavLink
          to={`/${role}-dashboard`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
          end
        >
          <FaTachometerAlt className="text-xl" />
          <span className="text-lg">Dashboard</span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/users`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaUsers className="text-xl" />
          <span className="text-lg">Người dùng </span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/students`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaUserGraduate className="text-xl" />
          <span className="text-lg">Sinh viên</span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/lecturers`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaChalkboardTeacher className="text-xl" />
          <span className="text-lg">Giảng viên</span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/equipments`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaDesktop className="text-xl" />
          <span className="text-lg">Thiết bị </span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/permissions`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaFileAlt className="text-xl" />
          <span className="text-lg">Phân quyền </span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/attendances`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaClipboardCheck className="text-xl" />
          <span className="text-lg">Điểm danh </span>
        </NavLink>

        <NavLink
          to={`/${role}-dashboard/setting`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-400" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
          }
        >
          <FaCog className="text-xl" />
          <span className="text-lg">Cài đặt </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
