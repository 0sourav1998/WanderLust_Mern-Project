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
      <div className='flex flex-col justify-center items-center mt-[40px]'>
        {
          image && <img src={image} className='h-[40px] w-[40px] rounded-full mb-10' alt='image'/>
        }
        <HiTrendingUp className={`text-2xl ${matchPath("/dashboard/all") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/all")}/>
        <FaHotel className={`text-2xl ${matchPath("/dashboard/mylistings") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/mylistings")}/>
        <FaBookmark className={`text-2xl ${matchPath("/dashboard/bookmark") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/bookmark")}/>
        <IoCreateSharp className={`text-2xl ${matchPath("/dashboard/createListing") ? "text-white" : "text-slate-500"} mb-10 cursor-pointer`} onClick={()=>navigate("/dashboard/createListing")}/>
        <button
              className="text-white cursor-pointer p-2 rounded-md w-fit h-fit hover:text-red-800 text-2xl transition-all duration-200 group"
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
