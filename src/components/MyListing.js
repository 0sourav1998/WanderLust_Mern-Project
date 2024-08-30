import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listingEndpoints } from "../services/apis";
import { deleteListing, fetchUserListing } from "../services/listings";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";
import { setListingId } from "../slice/modify";

const MyListing = () => {
  const { user } = useSelector((state) => state.user);
  const [listings, setListings] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const navigate = useNavigate();
  const fetchUserListings = async () => {
    const response = await fetchUserListing({ userId: user._id });
    setListings(response[0]?.listings);
  };

  const deleteMyListing = async (listingId) => {
    await deleteListing({ listingId: listingId, userId: user._id });
    setConfirmationModal(null);
    await fetchUserListings();
  };

  useEffect(() => {
    fetchUserListings();
  }, []);
  if (listings.length === 0) {
    return (
      <div className="h-screen w-screen flex sm:-mt-0 -mt-12 items-center sm:ml-64 ml-10">
        <div className="text-white mr-24 bg-slate-900 shadow-md shadow-white rounded-md sm:h-[150px] sm:w-[600px] h-[100px] w-[450px] flex flex-col justify-center items-center">
          <p className="sm:text-2xl mt-4">No Listings Cretaed so far</p>
          <button
            className="bg-green-600 rounded-md cursor-pointer py-2 sm:px-4 px-2 hover:scale-90 mt-4 w-fit transition-all duration-200"
            onClick={() => navigate("/dashboard/createListing")}
          >
            Create Listing
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="text-white sm:text-3xl text-xl sm:ml-8 ml-1 mr-1 sm:mt-6 sm:mb-10">
      <div className="mb-4 mt-2">
        <h1>My Listings</h1>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1">
        {listings.map((listing) => (
          <div className="relative flex justify-center items-center sm:-ml-10" key={listing._id}>
            <Link to={`/dashboard/listing/${listing._id}`}>
              <div className="sm:h-[400px] sm:w-[350px] h-fit w-fit bg-slate-950 rounded-lg overflow-hidden shadow-md shadow-white hover:opacity-60 hover:cursor-pointer transition-all duration-200">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full object-cover sm:p-5 p-2"
                />
                <div className="p-4 flex flex-col gap-1">
                  <h2 className="text-xl font-semibold text-white">
                    {listing.name}
                  </h2>
                  <p className="text-sm text-gray-400">{listing.description}</p>
                  <p className="text-lg font-medium text-white">
                    {listing.price}
                  </p>
                </div>
              </div>
              <div className="absolute flex gap-4 bottom-4 right-12 cursor-pointer">
                <FaEdit className="hover:scale-95 hover:text-blue-600 transition-all duration-200" />
                <MdDelete
                  className="hover:scale-95 hover:text-red-600 transition-all duration-200"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setConfirmationModal({
                      text1: "Are You Sure ?",
                      text2: "Selected Listing will be deleted",
                      btn1Text: "Cancel",
                      btn2Text: "Delete",
                      btn1Handler: () =>setConfirmationModal(null),
                      btn2Handler: ()=>deleteMyListing(listing._id),
                    });
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default MyListing;
