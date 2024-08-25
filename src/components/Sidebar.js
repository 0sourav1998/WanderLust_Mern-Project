import React from 'react'
import { FaHotel } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCreateSharp } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate() ;
  const location = useLocation();
  const matchPath = (path)=>{
    return path === location.pathname
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-[80px]'>
        <HiTrendingUp className={`text-2xl ${matchPath("/dashboard/all") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/all")}/>
        <FaHotel className={`text-2xl ${matchPath("/dashboard/mylistings") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/mylistings")}/>
        <FaBookmark className={`text-2xl ${matchPath("/dashboard/bookmark") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/bookmark")}/>
        <IoCreateSharp className={`text-2xl ${matchPath("/dashboard/createListing") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/createListing")}/>
      </div>
    </div>
  )
}

export default Sidebar
