import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import env from "../../../config/env.js";

const PermissionListActions = ({ id, onPermissionRefresh }) => {
    const navigate = useNavigate()
    const role = sessionStorage.getItem("role");

    const handleDelete = async (id) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa thông tin phân quyền này?")
        if(confirm){
            try {
                const response = await axios.delete(`${env.BE_API_PATH}/Permission/delete-permission/${id}`,{
                    headers : {
                        Authorization : `Bearer ${sessionStorage.getItem("token")}`
                    }
                })

                if(response.status === 200){
                    onPermissionRefresh()
                }
            } catch (error) {
                alert(error?.response?.data?.message || "Có lỗi xảy ra khi xóa phân quyền")
            }
        }
    }

    return (
        <div className="flex gap-4">
          <button
            title="Xem chi tiết"
            className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-2"
            onClick={() => navigate(`/${role}-dashboard/permissions/${id}`)}
          >
            <FaEye size={18} />
          </button>
    
          <button
            title="Xóa phân quyền"
            className="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-2"
            onClick={() => handleDelete(id)}
          >
            <FaTrash size={18} />
          </button>
        </div>
      );
};

export default PermissionListActions;
