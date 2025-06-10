import React, { useState, useEffect } from "react";
import { getAllLecturers } from "../../../utils/AdminHelper";
import DataTable from "react-data-table-component";
import { columns } from "./LecturerColumn";
import { useNavigate } from "react-router-dom";
import LecturerListFilters from "./LecturerListFilters";
import LecturerListActions from "./LecturerListActions";

const LecturerList = () => {
  const navigate = useNavigate();

  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onLecturerRefresh = () => {
    fetchLecturers();
  };

  const fetchLecturers = async () => {
    setLoading(true);
    try {
      const lecturers = await getAllLecturers();
      if (lecturers) {
        let sno = 1;
        const data = lecturers.map((lecturer) => ({
          id: lecturer.userId,
          sno: sno++,
          userName: lecturer.userName || "N/A",
          lecturerCode: lecturer.lecturerCode || "N/A",
          email: lecturer.email || "N/A",
          hireDate: new Date(lecturer.hireDate).toLocaleDateString("vi-VN"),
          action: (
            <LecturerListActions
              id={lecturer.userId}
              onlecturerRefresh={onLecturerRefresh}
            />
          ),
        }));
        setLecturers(data);
        setFilteredLecturers(data);
      }
    } catch (err) {
       console.log(err) 
      alert(err.response?.data?.message || "Failed to fetch lecturers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddLecturer = () => {
    navigate(`/admin-dashboard/lecturers/add-lecturer`);
  };

  const filterLecturers = (search) => {
    const data = lecturers.filter((lecturer) => {
      const matchesSearch =
        lecturer.userName.toLowerCase().includes(search.toLowerCase()) ||
        lecturer.lecturerCode.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredLecturers(data);
  };

  useEffect(() => {
    filterLecturers(searchText);
  }, [searchText]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-5">Quản lý giảng viên</h3>
      </div>

      <LecturerListFilters
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleAddLecturer={handleAddLecturer}
      />

      <div className="mt-5">
        <DataTable columns={columns} data={filteredLecturers} pagination />
      </div>
    </div>
  );
};

export default LecturerList;
