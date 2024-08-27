import React, { useState } from 'react';
import { uploadImage } from '../services/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserImageUpload = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.user)
    const [image,setImage] = useState(null)
    console.log(image)
    const uploadPicture = async () => {
        const formData = new FormData();
        if (image) {
            formData.append('File', image);
        }
        formData.append('userId', user._id);
        dispatch(uploadImage(formData, navigate));
    };
    
  return (
    <div className="text-white text-3xl h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900">
      <h1 className="mb-8 font-bold text-4xl tracking-wide">Choose an Image</h1>
      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
        className="w-fit p-4 border-2 border-dashed border-gray-400 bg-slate-800 text-lg text-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500 cursor-pointer hover:bg-slate-700 transition-all duration-200"
      />
      <div className="flex gap-6 mt-8">
        <button onClick={()=>navigate("/dashboard/all")} className="text-sm text-white p-3 rounded-lg bg-gray-600 hover:bg-gray-700 transition-all duration-200 shadow-lg transform hover:scale-105">
          Maybe Later
        </button>
        <button onClick={uploadPicture} className="text-lg text-white p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-200 shadow-lg transform hover:scale-105">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserImageUpload;
