import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteListing, fetchSpecificListing } from "../services/listings";
import { MdPlace } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import RatingAndReview from "./RatingAndReview";
import { FcRating } from "react-icons/fc";
import AllReviews from "./AllReviews";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import EditListing from "../components/EditListingModal";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";
import EditlistingModal from "../components/EditListingModal";
import { setToggleReview } from "../slice/modify";

const ListingDetails = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [listingDetail, setListingDetail] = useState(null);
  const [editListing, setEditListing] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [refreshData,setRefreshData] = useState(null);
  const dispatch = useDispatch()
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const {toggleReview} = useSelector((state)=>state.modify);

  const fetchListing = async () => {
    const response = await fetchSpecificListing({ listingId: id });
    setListingDetail(response);
  };

  const deleteListingFunc = async () => {
    const response = await deleteListing({ listingId: id, userId: user._id });
    setDeleteModal(null);
    dispatch(setToggleReview(prev=>!prev))
  };

  const handleToggleReview = () => {
    setReviewModal((prev) => !prev);
  };

  if(!refreshData){
    <p className="text-white text-2xl mx-auto">No Listing Found</p>
  }

  useEffect(() => {
    fetchListing();
  }, [id , toggleReview]);

  if (!listingDetail) {
    return (
      <div className="text-center text-white text-2xl mt-20">No Listing Found</div>
    );
  }

  return (
    <div className="flex flex-col -mt-[50px]">
      <div className="flex flex-col lg:flex-row bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-4xl ml-24 mt-24">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={listingDetail.image}
            alt={listingDetail.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:ml-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{listingDetail.name}</h1>
          <p className="text-lg mb-4">{listingDetail.description}</p>
          <div className="flex items-center gap-2">
            <FaRupeeSign className="text-xl mb-3.5" />{" "}
            <p className="text-xl font-semibold mb-4">
              <span className="text-green-400">: {listingDetail.price}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaMapLocationDot className="text-xl mb-3.5" />{" "}
            <p className="text-xl font-semibold mb-4">
              <span className="text-green-400">
                : {listingDetail.location}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdPlace className="text-xl mb-3.5" />{" "}
            <p className="text-xl font-semibold mb-4">
              <span className="text-green-400">: {listingDetail.country}</span>
            </p>
          </div>
        </div>
        <button
          className="text-white bg-green-600 cursor-pointer p-2 rounded-md w-fit h-fit group mr-4"
          onClick={handleToggleReview}
        >
          <FcRating className="text-xl" />
        </button>
        {user._id === listingDetail.owner && (
          <div className="flex gap-2">
            <button
              className="text-white cursor-pointer p-2 rounded-md w-fit h-fit hover:text-red-800 text-2xl transition-all duration-200 group"
              onClick={() =>
                setDeleteModal({
                  text1: "Are You Sure?",
                  text2: "Current Listing Will be Deleted",
                  btn1Text: "Cancel",
                  btn2Text: "Delete",
                  btn1Handler: () => setDeleteModal(null),
                  btn2Handler: deleteListingFunc,
                })
              }
            >
              <MdOutlineDeleteOutline />
            </button>
            <button
              className="text-white cursor-pointer p-2 rounded-md w-fit h-fit hover:text-blue-600 transition-all duration-200 group"
              onClick={() => setEditListing(listingDetail)}
            >
              <FaRegEdit className="text-xl" />
            </button>
          </div>
        )}
      </div>
      <AllReviews listingId={id} setRefreshData={setRefreshData}/>
      {reviewModal && (
        <RatingAndReview
          listingId={id}
          create={true}
          setRefreshData={setRefreshData}
          setReviewModal={setReviewModal}
        />
      )}
      {editListing && (
        <EditlistingModal
          editListing={editListing}
          setEditListing={setEditListing}
          setRefreshData = {setRefreshData}
        />
      )}
      {deleteModal && (
        <ConfirmationModal
          modalData={deleteModal}
        />
      )}
    </div>
  );
};

export default ListingDetails;
