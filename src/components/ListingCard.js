import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <div className='flex justify-center items-center'>
      <Link to={`/dashboard/listing/${listing._id}`}>
      <div className='h-[350px] w-[350px] bg-slate-950 rounded-lg overflow-hidden shadow-md shadow-white hover:opacity-60 hover:cursor-pointer transition-all duration-200'>
        <img 
          src={listing.image} 
          alt={listing.name} 
          className='h-[200px] w-full object-cover p-5'
        />
        <div className='p-4 flex flex-col gap-2'>
          <h2 className='text-xl font-semibold text-white'>{listing.name}</h2>
          <p className='text-sm text-gray-400'>{listing.description}</p>
          <p className='text-lg font-medium text-white'>{listing.price}</p>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default ListingCard;
