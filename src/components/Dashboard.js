import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex flex-grow sm:flex-row flex-col w-full"> 
        <div className="sm:w-1/12 sm:mr-4 z-50 sm:pt-0 bg-slate-800 sm:h-[70vh] h-[70px] sm:ml-6 ml-0 sm:mt-8 smt-0 rounded-md sm:p-2 p-1">
          <Sidebar />
        </div>
        <div className="flex-grow w-full sm:w-11/12"> 
          <Outlet />
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Dashboard;
