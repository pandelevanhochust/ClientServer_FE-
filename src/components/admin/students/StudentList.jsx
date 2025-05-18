import React, { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils/AdminHelper";
import StudentListActions from "./StudentListAction";
import DataTable from "react-data-table-component";
import { columns } from "./StudentColumn";
import StudentListFilters from "./StudentListFilters";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onStudentRefresh = () => {
    fetchStudents();
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const students = await getAllStudents();
      if (students) {
        let sno = 1;
        const data = students.map((student) => ({
          id: student.userId,
          sno: sno++,
          userName: student.userName || "N/A",
          studentCode: student.studentCode || "N/A",
          email: student.email || "N/A",
          enrollDate: new Date(student.enrollDate).toLocaleDateString("vi-VN"),
          action: (
            <StudentListActions
              id={student.userId}
              onStudentRefresh={onStudentRefresh}
            />
          ),
        }));
        setStudents(data);
        setFilteredStudents(data);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddStudent = () => {
    navigate(`/admin-dashboard/students/add-student`);
  };

  const filterStudents = (search) => {
    const data = students.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        student.studentCode.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredStudents(data);
  };

  useEffect(() => {
    filterStudents(searchText);
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
        <h3 className="text-2xl font-bold mb-5">Quản lý sinh viên</h3>
      </div>

      <StudentListFilters
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleAddStudent={handleAddStudent}
      />

      <div className="mt-5">
        <DataTable columns={columns} data={filteredStudents} pagination />
      </div>
    </div>
  );
};

export default StudentList;
