import React, { useEffect, useRef, useState } from "react";
import { fetchAllListings } from "../services/listings";
import ListingCard from "./ListingCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Listing = () => {
  const listingRef = useRef(null);
  console.log(listingRef.current);
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const fetchAllListing = async () => {
    const response = await fetchAllListings();
    setListings(response);
    setAllListings(response);
  };

  useEffect(() => {
    fetchAllListing();
  }, []);

  const handleSearch = () => {
    const searchResult = listingRef?.current?.value;
    console.log(searchResult)
    if (searchResult === "") {
      setListings(allListings);
    }
    const filteredListings = listings.filter((listing) =>
      listing.name.toLowerCase().includes(searchResult.toLowerCase())
    );
    setListings(filteredListings);
  };
  const {isLoggout} = useSelector((state)=>state.user)

  useEffect(() => {
    fetchAllListing();
  }, []);
  return (
    <div className="text-white text-3xl sm:ml-12 sm:mt-8 sm:mb-10 ml-1 mr-1 mt-4 mb-4">
      <div className="mb-4 flex sm:flex-row flex-col justify-between">
        <div>
          <Link to="/dashboard/all"><h1>All Listings</h1></Link>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 sm:w-[40%] w-full mr-24">
          <input
            ref={listingRef}
            placeholder="Serach here"
            type="text"
            className="w-full rounded-[10px] sm:text-lg text-sm mt-4 text-black focus:ring-4 focus:ring-blue-500 p-2"
          />
          <button
            onClick={handleSearch}
            className="w-fit py-1 px-1 text-center rounded-md hover:scale-95 transition-all duration-200 bg-blue-500 text-white sm:text-lg text-sm"
          >
            Search
          </button>
        </div>
      </div>
      {listings?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings &&
            listings.map((listing) => <ListingCard listing={listing} />)}
        </div>
      ) : (
        <p className="text-white text-center text-3xl ml-80 p-8 mx-auto mt-[200px] h-[100px] w-[400px] bg-slate-900 shadow-md shadow-white">No Listing Found</p>
      )}
    </div>
  );
};

export default Listing;
