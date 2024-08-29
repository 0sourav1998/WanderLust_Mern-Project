import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { modifyListing } from "../services/listings";
import { setToggleReview } from "../slice/modify";
import { useDispatch } from "react-redux";

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
    <div className="fixed !mt-0 z-1000 insert-0 h-screen w-screen flex flex-col items-center justify-center backdrop:blur-md overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleEditListing)}
        enctype="multipart/form-data"
        className="relative bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10 transform transition-all duration-300 hover:shadow-xl"
      >
        {/* Image Preview */}
        {editListing?.image && (
          <div className="flex justify-center mb-4">
            <img
              src={editListing.image}
              alt={editListing.name}
              className="h-40 w-40 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col mb-2">
          <label htmlFor="title" className="text-white text-sm mb-1">
            Title
          </label>
          <input
            placeholder="Enter Listing Title"
            id="title"
            name="title"
            className="text-black p-1.5 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="description" className="text-white text-sm mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter Listing Description"
            id="description"
            name="description"
            className="text-black p-1.5 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("description")}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="price" className="text-white text-sm mb-1">
            Price
          </label>
          <input
            placeholder="Enter Listing Price"
            id="price"
            name="price"
            type="text"
            className="text-black p-1.5 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
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
            className="text-black p-3 border border-dashed border-white rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
            {...register("file")}
          />
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col mb-2">
            <label htmlFor="location" className="text-white text-sm mb-1">
              Location
            </label>
            <input
              placeholder="Enter Listing Location"
              id="location"
              name="location"
              type="text"
              className="text-black p-1.5 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
              {...register("location")}
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="country" className="text-white text-sm mb-1">
              Country
            </label>
            <input
              placeholder="Enter Listing Country"
              id="country"
              name="country"
              type="text"
              className="text-black p-1.5 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
              {...register("country")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-6 rounded-lg w-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditlistingModal;
