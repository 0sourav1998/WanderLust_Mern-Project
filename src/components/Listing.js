import React, { useEffect, useState } from 'react'
import { fetchAllListings } from '../services/listings';
import ListingCard from './ListingCard';

const Listing = () => {
    const [listings,setListings] = useState(null) ;
    console.log("Listings",listings)
    const fetchAllListing = async()=>{
        const response = await fetchAllListings();
        setListings(response) ;
    }

    useEffect(()=>{
        fetchAllListing()
    },[])
  return (
    <div className='text-white text-3xl ml-36 mt-8 mb-10'>
      <div className='mb-4'>
        <h1>All Listings</h1>
      </div>
      <div className='flex flex-row flex-wrap gap-8'>
        {listings && listings.map((listing)=>(
            <ListingCard listing={listing}/>
        ))}
      </div>
    </div>
  )
}

export default Listing
