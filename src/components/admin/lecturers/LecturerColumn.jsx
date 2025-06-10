export const columns = [
    {
      name: "STT",
      selector: (row) => row.sno,
      center: "true",
      width: "70px",
    },
    {
      name: "Tên đăng nhập",
      selector: (row) => row.userName,
      width: "150px",
    },
    {
      name: "Mã giảng viên",
      selector: (row) => row.lecturerCode,
      width: "180px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "150px",
    },
    {
      name: "Ngày đăng ký",
      selector: (row) => row.hireDate, 
      center: "true",
      width: "180px",
    },
    {
      name: "Thao tác",
      selector: (row) => row.action,
      center: "true",
    },
  ];