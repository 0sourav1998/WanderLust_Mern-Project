import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addListingAsBookmark, fetchBookmarkListing, removeBookmark } from "../services/listings";

const ListingCard = ({ listing }) => {
  const [bookmark, setBookmark] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchListing = async()=>{
    const response = await fetchBookmarkListing({userId : user._id});
    setBookmark(response?.bookmarkedListings)
  }
  useEffect(() => {
    fetchListing();
  }, []);

  const isBookmarked = () => {
    return bookmark?.some((list) => list._id === listing._id);
  };

  const bookmarkAddOrRemove = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isBookmarked()) {
      const response = await removeBookmark({userId : user._id , listingId : listing._id})
      setBookmark(response)
      console.log("Already bookmarked, handle removal logic here");
    } else {
      const response = await addListingAsBookmark({
        userId: user._id,
        listingId: listing._id,
      });
      console.log("RESULT",response)
        setBookmark(response);
    }
  };

  return (
    <div className="">
      <Link to={`/dashboard/listing/${listing._id}`}>
        <div className="relative ">
          <div className="sm:h-[400px] sm:w-[300px] h-fit w-fit bg-slate-950 rounded-lg overflow-hidden shadow-md shadow-white hover:opacity-60 hover:cursor-pointer transition-all duration-200 sm:mr-8">
            <img
              src={listing.image}
              alt={listing.name}
              className="h-fit w-fit object-cover p-5"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white">
                {listing.name}
              </h2>
              <p className="text-sm text-gray-400">{listing.description}</p>
              <p className="text-lg font-medium text-white">Rs. {listing.price}/night</p>
            </div>
          </div>
          <FaBookmark
            className={`absolute top-5 sm:right-28 right-6 ${
              isBookmarked() ? "text-blue-500" : "text-white"
            }`}
            onClick={bookmarkAddOrRemove}
          />
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
