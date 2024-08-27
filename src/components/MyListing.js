import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listingEndpoints } from "../services/apis";
import { fetchUserListing } from "../services/listings";
import { Link, useNavigate } from "react-router-dom";

const MyListing = () => {
  const { user } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();
  const fetchUserListings = async () => {
    const response = await fetchUserListing({ userId: user._id });
    setListings(response[0]?.listings);
  };
  useEffect(() => {
    fetchUserListings();
  }, []);
  if (listings.length === 0) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="text-white bg-slate-900 shadow-md shadow-white rounded-md h-[150px] w-[600px] flex flex-col justify-center items-center">
          <p className="text-2xl mt-4">
            No Listings Cretaed so far
          </p>
          <button className="bg-green-600 rounded-md cursor-pointer py-2 px-4 hover:scale-90 mt-4 w-fit transition-all duration-200" onClick={()=>navigate("/dashboard/createListing")}>Create Listing</button>
        </div>
      </div>
    );
  }
  return (
    <div className="text-white text-3xl ml-36 mt-8 mb-10">
      <div className="mb-4">
        <h1>My Listings</h1>
      </div>
      <div className="flex flex-wrap gap-8">
        {listings.map((listing) => (
          <div className="flex justify-center items-center">
            <Link to={`/dashboard/listing/${listing._id}`}>
              <div className="h-[350px] w-[350px] bg-slate-950 rounded-lg overflow-hidden shadow-md shadow-white hover:opacity-60 hover:cursor-pointer transition-all duration-200">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="h-[200px] w-full object-cover p-5"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-white">
                    {listing.name}
                  </h2>
                  <p className="text-sm text-gray-400">{listing.description}</p>
                  <p className="text-lg font-medium text-white">
                    {listing.price}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
