import React, { useEffect, useRef, useState } from "react";
import { fetchAllListings } from "../services/listings";
import ListingCard from "./ListingCard";

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
    if (searchResult === "") {
      setListings(allListings);
    }
    const filteredListings = listings.filter((listing) =>
      listing.name.toLowerCase().includes(searchResult.toLowerCase())
    );
    console.log(filteredListings);
    setListings(filteredListings);
  };

  useEffect(() => {
    fetchAllListing();
  }, []);
  return (
    <div className="text-white text-3xl ml-36 mt-8 mb-10">
      <div className="mb-4 flex justify-between">
        <div>
          <h1>All Listings</h1>
        </div>
        <div className="flex gap-4 w-[40%] mr-24">
          <input
            ref={listingRef}
            placeholder="Serach here"
            type="text"
            className="w-full rounded-[10px] text-lg text-black focus:ring-4 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="w-fit p-2 text-center rounded-md hover:scale-95 transition-all duration-200 bg-blue-500 text-white text-lg"
          >
            Search
          </button>
        </div>
      </div>
      {listings?.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-8">
          {listings &&
            listings.map((listing) => <ListingCard listing={listing} />)}
        </div>
      ) : (
        <p className="text-white text-center text-3xl p-8 mx-auto mt-[200px] h-[100px] w-[400px] bg-slate-900 shadow-md shadow-white">No Listing Found</p>
      )}
    </div>
  );
};

export default Listing;
