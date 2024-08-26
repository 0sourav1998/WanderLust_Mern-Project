import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpecificListing } from "../services/listings";
import { MdPlace } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import RatingAndReview from "./RatingAndReview";
import { FcRating } from "react-icons/fc";
import AllReviews from "./AllReviews";

const ListingDetails = () => {
  const [reviewModal,setReviewModal] = useState(false)
  const [listingDetails, setListingDetails] = useState(null);
  const { id } = useParams();

  const fetchListing = async () => {
    const response = await fetchSpecificListing({ listingId: id });
    setListingDetails(response);
  };

  const handleToggleReview = ()=>{
    setReviewModal(prev=>!prev)
  }

  useEffect(() => {
    fetchListing();
  }, [id]);

  if (!listingDetails) {
    return (
      <div className="text-center text-white text-2xl mt-20">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col lg:flex-row bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-20">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={listingDetails.image}
            alt={listingDetails.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:ml-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{listingDetails.name}</h1>
          <p className="text-lg mb-4">{listingDetails.description}</p>
          <div className="flex items-center gap-2">
            <FaRupeeSign className="text-xl mb-3.5" />{" "}
            <p className="text-xl font-semibold mb-4">
              <span className="text-green-400">: {listingDetails.price}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaMapLocationDot className="text-xl mb-3.5" />{" "}
            <p className="text-xl font-semibold mb-4">
              <span className="text-green-400">
                : {listingDetails.location}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdPlace className="text-xl mb-3.5" />{" "}
            <p className="text-xl font-semibold mb-4">
              <span className="text-green-400">: {listingDetails.country}</span>
            </p>
          </div>
        </div>
        <button className="relative text-white bg-green-600 cursor-pointer p-2 rounded-md w-fit h-fit group" onClick={handleToggleReview}><FcRating className="text-xl"/><p className="absolute top-12 left-1 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[7px]">Add Review</p></button>
      </div>
      <AllReviews listingId={id}/>
      {
        reviewModal && <RatingAndReview listingId={id} setReviewModal={setReviewModal}/>
      }
    </div>
  );
};

export default ListingDetails;
