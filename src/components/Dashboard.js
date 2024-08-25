import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/Sidebar"

const Dashboard = () => {
  return (
    <div className='flex'>
      <div className='w-[5%] bg-slate-800 h-[70vh] ml-6 mt-8 rounded-md fixed'>
        <Sidebar/>
      </div>
      <div className='w-[80%] flex-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
