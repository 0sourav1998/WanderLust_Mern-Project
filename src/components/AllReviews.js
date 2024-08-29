import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  deleteReview,
  fetchAllReview,
  fetchReview,
} from "../services/ratingReview";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import RatingAndReview from "./RatingAndReview";

const AllReviews = ({ listingId }) => {
  const [reviews, setReviews] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
  const [refreshData, setRefreshData] = useState(null);
  const { user } = useSelector((state) => state.user);

  const { toggleReview } = useSelector((state) => state.modify);
  const toggle = () => {
    setReviewModal((prev) => !prev);
  };
  const fetchReviews = async () => {
    const ratinAndReview = await fetchReview({ listingId: listingId });
    setReviews(ratinAndReview);
  };
  useEffect(() => {
    fetchReviews();
  }, [toggleReview]);

  const handleDelete = async (ratingReviewId) => {
    const response = await deleteReview({
      listingId: listingId,
      ratingReviewId: ratingReviewId,
    });
    setReviews(response);
    setRefreshData((prev) => !prev);
  };

  if (!reviews) {
    return (
      <div className="text-white text-3xl text-center">No Reviews Found</div>
    );
  }
  return (
    <div className="text-white text-xl mt-10 bg-slate-800 p-6 rounded-lg shadow-lg mb-10 ml-56">
      <h1 className="text-white text-2xl text-center mb-4">All Reviews</h1>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
        >
          {reviews &&
            reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="relative bg-gray-900 p-5 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer">
                  <p className="text-lg font-bold">Rating: {review.rating}/5</p>
                  <p className="text-base mt-2">Review: {review.reviews}</p>
                  {user._id === review.owner && (
                    <div className="absolute top-4 right-4 flex gap-2 ">
                      <MdEdit
                        className="cursor-pointer hover:text-blue-500 transition-all duration-200 hover:scale-90"
                        onClick={() => setReviewModal(review)}
                      />
                      <MdDelete
                        className="cursor-pointer hover:text-red-700 transition-all duration-200 hover:scale-90"
                        onClick={() => handleDelete(review._id)}
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      {reviewModal && (
        <RatingAndReview
          edit={true}
          setRefreshData={setRefreshData}
          setReviewModal={setReviewModal}
          reviewModal={reviewModal}
          listingId={listingId}
        />
      )}
    </div>
  );
};

export default AllReviews;
