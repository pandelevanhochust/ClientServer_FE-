import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div  className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1 ml-64 bg-gray-100 min-h-full w-full'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard