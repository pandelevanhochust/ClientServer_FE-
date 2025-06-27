import React, { useState, useEffect } from 'react'
import { getAllPermissions } from '../../../utils/AdminHelper'
import DataTable from 'react-data-table-component'
import { columns } from './PermissionListColumn'
import PermissionListActions from './PermissionListActions'
import PermissionListFilters from './PermissionsListFilters'
import { useNavigate } from 'react-router-dom'

const PermissionList = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState([])
  const [filteredPermissions, setFilteredPermissions] = useState([])
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")

  const onPermissionRefresh = () => {
    fetchPermissionList()
  }

  const fetchPermissionList = async () => {
    setLoading(true)
    try {
      const permissions = await getAllPermissions()
      
      if(permissions){
        let sno = 1
        const data = permissions.map((permission) => ({
          id : permission.id,
          sno : sno++,
          numOfUsers : permission.users.$values.length,
          numOfDevices : permission.deviceIds.$values.length,
          timeStart : new Date(permission.timeStart).toLocaleString("vi-VN"),
          timeEnd : new Date(permission.timeEnd).toLocaleString("vi-VN"),
          createdAt : new Date(permission.createdAt).toLocaleString("vi-VN"),
          action : <PermissionListActions id={permission.id} onPermissionRefresh={onPermissionRefresh}/>
        }))
        setPermissions(data)
        setFilteredPermissions(data)
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Lỗi khi lấy danh sách phân quyền")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPermissionList()
  },[])

  const handleAddPermission = () => {
    navigate("/admin-dashboard/permissions/create-permission")
  }

  const filterPermission = (sDate, eDate) => {
    const data = permissions.filter((permission) => {
      const matchesStartDate =
        sDate === "" ||
        new Date(permission.timeStart).toLocaleString("vi-VN") >= sDate;
      const matchesEndDate =
        eDate === "" ||
        new Date(permission.timeEnd).toLocaleString("vi-VN") <= eDate;
      return (
        matchesStartDate &&
        matchesEndDate
      );
    });
    setFilteredPermissions(data);
  }

  useEffect(() => {
      filterPermission(filterStartDate, filterEndDate)
    },[filterStartDate, filterEndDate])

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
        <h3 className="text-2xl font-bold mb-5">Quản lý phân quyền</h3>
      </div>

      <PermissionListFilters
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onStartDateChange={(e) => setFilterStartDate(e.target.value)}
        onEndDateChange={(e) => setFilterEndDate(e.target.value)}
        handleAddPermission={handleAddPermission}
      />

      <div className="mt-5">
        <DataTable columns={columns} data={filteredPermissions} pagination />
      </div>
    </div>
  );
}

export default PermissionList