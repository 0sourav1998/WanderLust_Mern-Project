import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-gray-800 to-gray-900 w-full flex-shrink-0 flex flex-col justify-center items-center gap-y-6 p-4 mt-12'>
      <h1 className='text-white sm:text-3xl text-sm font-semibold'>
        © 2024 WanderLust Private Limited
      </h1>
      <div className='flex flex-row gap-x-6 text-2xl text-white'>
        <FaFacebook className='hover:text-blue-600 hover:scale-110 transition-transform duration-300 cursor-pointer' />
        <FaInstagramSquare className='hover:text-pink-500 hover:scale-110 transition-transform duration-300 cursor-pointer' />
        <FaTwitter className='hover:text-blue-400 hover:scale-110 transition-transform duration-300 cursor-pointer' />
      </div>
      <p className='text-gray-400 text-sm sm:text-base text-center'>
        Follow us on social media for more updates!
      </p>
    </div>
  );
};

export default Footer;
