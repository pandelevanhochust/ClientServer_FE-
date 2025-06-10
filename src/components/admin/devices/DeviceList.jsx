import React, { useState, useEffect } from "react";
import { getAllDevices } from "../../../utils/AdminHelper";
import DataTable from "react-data-table-component";
import DeviceListFilters from "./DeviceListFilter";
import { columns } from "./DeviceColumn";
import DeviceListActions from "./DeviceListActions";
//import { useNavigate } from "react-router-dom";

const DeviceList = () => {
  //const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

//   const onDeviceRefresh = () => {
//     fetchDevices();
//   };

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const devices = await getAllDevices(10,0);
      if (devices) {
        let sno = 1;
        const data = devices.map((device) => ({
          id: device.id.id,
          sno: sno++,
          name: device.name || "N/A",
          type: device.type || "N/A",
          label: device.label || "N/A",
          action: <DeviceListActions id={device.id.id}/>,
        }));
        setDevices(data);
        setFilteredDevices(data);
      }
    } catch (err) {
       console.log(err) 
      alert(err.response?.data?.message || "Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

//   const handleAddLecturer = () => {
//     navigate(`/admin-dashboard/lecturers/add-lecturer`);
//   };

  const filterDevices = (search) => {
    const data = devices.filter((device) => {
      const matchesSearch =
        device.type.toLowerCase().includes(search.toLowerCase()) ||
        device.label.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredDevices(data);
  };

  useEffect(() => {
    filterDevices(searchText);
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
        <h3 className="text-2xl font-bold mb-5">Quản lý thiết bị</h3>
      </div>

      <DeviceListFilters
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        //handleAddLecturer={handleAddLecturer}
      />

      <div className="mt-5">
        <DataTable columns={columns} data={filteredDevices} pagination />
      </div>
    </div>
  );
};

export default DeviceList;
