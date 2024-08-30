import React, { useState } from 'react'
import { FaHotel } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCreateSharp } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations';
import ConfirmationModal from './ConfirmationModal';
import { setIsLoggedout } from '../slice/user';

const Sidebar = () => {
  const navigate = useNavigate() ;
  const location = useLocation();
  const dispatch = useDispatch();
  const {image} = useSelector((state)=>state.user)
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
      <div className='flex sm:flex-col flex-row sm:justify-center justify-between items-center sm:mt-[40px] px-2 py-4'>
        {
          image && <img src={image} className='sm:h-[40px] sm:w-[40px] h-[30px] w-[30px] rounded-full mb-10' alt='image'/>
        }
        <HiTrendingUp className={`sm:text-2xl text-lg ${matchPath("/dashboard/all") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/all")}/>
        <FaHotel className={`sm:text-2xl text-lg ${matchPath("/dashboard/mylistings") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/mylistings")}/>
        <FaBookmark className={`sm:text-2xl text-lg ${matchPath("/dashboard/bookmark") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/bookmark")}/>
        <IoCreateSharp className={`sm:text-2xl text-lg ${matchPath("/dashboard/createListing") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/createListing")}/>
        <button
              className="text-slate-500 cursor-pointer p-2 rounded-md w-fit h-fit hover:text-red-800 text-2xl transition-all duration-200 group sm:-mt-0 -mt-9 sm:mr-0 mr-1"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure?",
                  text2: "You Will be logged out",
                  btn1Text: "Cancel",
                  btn2Text: "Logout",
                  btn1Handler: () => setConfirmationModal(null),
                  btn2Handler: handleLogout,
                })
              }
            >
              <RiLogoutBoxRLine />
            </button>
      </div>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default Sidebar
