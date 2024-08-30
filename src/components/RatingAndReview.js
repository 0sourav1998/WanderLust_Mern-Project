import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { createRatings, editReview } from "../services/ratingReview";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setToggleReview } from "../slice/modify";

const RatingAndReview = ({ listingId , setReviewModal , setRefreshData , reviewModal , create = false , edit = false}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const diapatch = useDispatch();
  useEffect(()=>{
    if(edit){
      setRating(reviewModal.rating);
      setReview(reviewModal.reviews)
    }
  },[])
  const {user} = useSelector((state)=>state.user)
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const handleReviewEdit =async()=>{
    const response = await editReview({ratingReviewId : reviewModal._id , rating : rating , reviews : review});
    setReviewModal(null);
    diapatch(setToggleReview(prev=>!prev))
  }
  const handleReviewSubmit = async () => {
    await createRatings({
      rating: rating,
      reviews: review,
      listingId: listingId,
      ownerId: user._id
    });
    setReviewModal(false)
    diapatch(setToggleReview(prev=>!prev))
  };
  const cancelReviewModal = ()=>{
    setReviewModal(false)
  }
  return (
    <div className="fixed h-screen w-screen inset-0 z-[1000] !mt-0 flex flex-col  items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="sm:w-[500px] w-[200px] bg-slate-800 p-6 rounded-md flex flex-col gap-y-4">
        <div className="flex justify-between border-b border-white">
            <h1 className="sm:mb-6 sm:text-2xl sm:font-bold mb-3 text-sm font-semibold text-center text-white">
            {
              create ? "Add Your Rating and Review" : "Edit Your Rating And Review"
            }
            </h1>
            <button onClick={cancelReviewModal}><RxCross1 className="text-white text-2xl -mt-6 cursor-pointer"/></button>
        </div>
        <textarea
          type="text"
          placeholder={create ? "Enter Your Review" : edit ?  `${reviewModal.reviews}` : "View Review"} 
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full text-black rounded-md p-3 mb-4 h-[100px] focus:outline-none focus:ring-4 focus:ring-blue-500"
        />
        <div className="flex justify-center">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            value={rating}
            size={50}
            key={rating}
            activeColor="#ffd700"
            classNames="focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={create ? handleReviewSubmit : edit ? handleReviewEdit : null}
          className="w-full sm:mt-4 sm:text-xl mt-2 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md sm:p-3 p-2 transition duration-300 ease-in-out"
        >
          {create ? "Submit Review" : edit ? "Save Changes" : "Loading"}
        </button>
      </div>
    </div>
  );
};

export default RatingAndReview;
