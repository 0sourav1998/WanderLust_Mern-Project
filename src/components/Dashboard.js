import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Sidebar"

const Dashboard = () => {
  return (
    <div className='flex w-screen'>
      <div className='w-1/12 bg-slate-800 h-[70vh] ml-6 mt-8 rounded-md'>
        <Sidebar/>
      </div>
      <div className='w-11/12'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
