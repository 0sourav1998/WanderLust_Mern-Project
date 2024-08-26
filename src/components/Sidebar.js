import React, { useState } from 'react'
import { FaHotel } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCreateSharp } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { logout } from '../services/operations';
import ConfirmationModal from './ConfirmationModal';

const Sidebar = () => {
  const navigate = useNavigate() ;
  const location = useLocation();
  const dispatch = useDispatch();
  const [confirmationModal,setConfirmationModal] = useState(false)
  const matchPath = (path)=>{
    return path === location.pathname
  }
  const handleLogout = () =>{
    console.log("Log out function triggered")
    dispatch(logout(navigate))
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-[80px]'>
        <HiTrendingUp className={`text-2xl ${matchPath("/dashboard/all") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/all")}/>
        <FaHotel className={`text-2xl ${matchPath("/dashboard/mylistings") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/mylistings")}/>
        <FaBookmark className={`text-2xl ${matchPath("/dashboard/bookmark") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/bookmark")}/>
        <IoCreateSharp className={`text-2xl ${matchPath("/dashboard/createListing") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/createListing")}/>
        <RiLogoutBoxRLine className={`text-2xl text-slate-500 mb-10 cursor-pointer`} onClick={()=>setConfirmationModal({
          text1 : "Are You Sure?",
          text2 : "You Will Be Logged Out",
          btn1Text : "Cancel",
          btn2Text : "Logout",
          btn1Handler : ()=>setConfirmationModal(false),
          btn2Handler : handleLogout
        })}/>
      </div>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default Sidebar
