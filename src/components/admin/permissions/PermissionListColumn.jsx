export const columns = [
    {
      name: "STT",
      selector: (row) => row.sno,
      center: "true",
      width: "70px",
    },
    {
      name: "Số lượng người dùng",
      selector: (row) => row.numOfUsers,
      width: "150px",
      center: "true"
    },
    {
      name: "Số lượng thiết bị",
      selector: (row) => row.numOfDevices,
      width: "150px",
      center: "true"
    },
    {
      name: "Thời gian bắt đầu",
      selector: (row) => row.timeStart,
      width: "180px",
      center: "true"
    },
    {
      name: "Thời gian kết thúc",
      selector: (row) => row.timeEnd, 
      center: "true",
      width: "180px",
    },
    {
      name: "Thời gian tạo",
      selector: (row) => row.createdAt, 
      center: "true",
      width: "180px",
    },
    {
      name: "Thao tác",
      selector: (row) => row.action,
      center: "true",
    },
  ];