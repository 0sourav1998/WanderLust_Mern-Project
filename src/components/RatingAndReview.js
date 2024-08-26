import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { createRatings } from "../services/ratingReview";
import { RxCross1 } from "react-icons/rx";
import AllRevies from "./AllReviews";

const RatingAndReview = ({ listingId , setReviewModal}) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const handleReviewSubmit = async () => {
    await createRatings({
      rating: rating,
      reviews: review,
      listingId: listingId,
    });
    setReviewModal(false)
  };
  const cancelReviewModal = ()=>{
    setReviewModal(false)
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex flex-col  items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[500px] bg-slate-800 p-6 rounded-md">
        <div className="flex justify-between border-b border-white">
            <h1 className="mb-6 text-2xl font-bold text-center">
            Add Your Rating and Review
            </h1>
            <button onClick={cancelReviewModal}><RxCross1 className="text-white text-2xl -mt-6 cursor-pointer"/></button>
        </div>
        <textarea
          type="text"
          placeholder="Enter Your Review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full text-black rounded-md p-3 mb-4 h-[100px] focus:outline-none focus:ring-4 focus:ring-blue-500"
        />
        <div className="flex justify-center mb-4">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={50}
            activeColor="#ffd700"
            classNames="focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={handleReviewSubmit}
          className="w-full text-xl bg-green-500 hover:bg-green-600 text-white rounded-md p-3 transition duration-300 ease-in-out"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default RatingAndReview;
