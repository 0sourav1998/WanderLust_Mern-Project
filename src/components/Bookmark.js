import React, { useEffect, useState } from "react";
import { fetchBookmarkListing } from "../services/listings";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const [myBookmarks, setMyBookmarks] = useState([]);
  console.log("MY BOOKMARKS", myBookmarks);
  const { user } = useSelector((state) => state.user);
  const fetchListing = async () => {
    const response = await fetchBookmarkListing({ userId: user._id });
    setMyBookmarks(response.bookmarkedListings);
  };
  useEffect(() => {
    fetchListing();
  }, []);
  return (
    <div className="flex flex-col gap-6 ml-36 mt-10 mb-10">
      <div><h1 className="text-white text-3xl">My Bookmarks</h1></div>
      <div className="flex flex-wrap gap-10">
      {myBookmarks.map((listing) => (
        <Link to={`/dashboard/listing/${listing._id}`}>
          <div >
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
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default Bookmark;
