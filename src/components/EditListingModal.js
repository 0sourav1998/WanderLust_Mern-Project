import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { modifyListing } from "../services/listings";
import { setToggleReview } from "../slice/modify";
import { useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const EditlistingModal = ({ editListing, setEditListing, setRefreshData }) => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const handleEditListing = async (data) => {
    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("country", data.country);

    // Check if a new file is uploaded
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    formData.append("listingId", editListing._id);

    await modifyListing(formData);
    dispatch(setToggleReview(prev=>!prev))
    setEditListing(null);
  };

  useEffect(() => {
    if (editListing) {
      setValue("title", editListing.name);
      setValue("description", editListing.description);
      setValue("price", editListing.price);
      setValue("location", editListing.location);
      setValue("country", editListing.country);
    }
  }, [editListing, setValue]);

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleEditListing)}
        enctype="multipart/form-data"
        className="relative bg-gray-900 sm:p-4 rounded-lg shadow-lg w-full max-w-md mx-auto sm:mt-10 pt-5 transform transition-all duration-300 hover:shadow-xl"
      >
        {editListing?.image && (
          <div className="flex justify-center mb-4">
            <img
              src={editListing.image}
              alt={editListing.name}
              className="h-32 w-32 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col mb-2">
          <label htmlFor="title" className="text-white sm:text-sm text-xs mb-1">
            Title
          </label>
          <input
            placeholder="Enter Listing Title"
            id="title"
            name="title"
            className="text-black sm:p-1.5 p-1 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="description" className="text-white sm:text-sm text-xs mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter Listing Description"
            id="description"
            name="description"
            className="text-black sm:p-1.5 p-1 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("description")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="price" className="text-white sm:text-sm text-xs mb-1">
            Price
          </label>
          <input
            placeholder="Enter Listing Price"
            id="price"
            name="price"
            type="text"
            className="text-black sm:p-1.5 p-1 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("price")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="file" className="text-white text-sm mb-1">
            Choose an Image
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className="text-black sm:p-3 p-1.5 border border-dashed border-white rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("file")}
          />
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">
          <div className="flex flex-col mb-2">
            <label htmlFor="location" className="text-white sm:text-sm text-xs mb-1">
              Location
            </label>
            <input
              placeholder="Enter Listing Location"
              id="location"
              name="location"
              type="text"
              className="text-black sm:p-1.5 p-1 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
              {...register("location")}
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="country" className="text-white sm:text-sm text-xs mb-1">
              Country
            </label>
            <input
              placeholder="Enter Listing Country"
              id="country"
              name="country"
              type="text"
              className="text-black sm:p-1.5 p-1 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
              {...register("country")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white sm:py-3 sm:px-6 py-1 px-3 rounded-lg w-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Save Changes
        </button>
        <button className="absolute top-4 right-4 text-white sm:text-xl text-lg" onClick={()=>setEditListing(false)}><RxCross1/></button>
      </form>
    </div>
  );
};

export default EditlistingModal;