import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createListing } from "../services/listings";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleCreateListing = async (data) => {
    const formData = new FormData();
    formData.append("owner", user._id);
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("country", data.country);
    formData.append("file", data.file[0]);
    await createListing(formData, navigate);
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateListing)}
      enctype="multipart/form-data"
      className="bg-gray-900 sm:p-4 rounded-lg shadow-lg sm:w-screen max-w-md mx-auto mt-10 sm:ml-72 ml-1 mr-1 transform transition-all duration-300 hover:shadow-xl p-2"
    >
      <h1 className="text-white sm:text-3xl text-lg sm:mb-6 mb-2 text-center font-bold">Create a Listing</h1>
      <div className="flex flex-col sm:mb-6 mb-2">
        <label htmlFor="title" className="text-white sm:text-lg sm:mb-2 text-xs mb-1">
          Title
        </label>
        <input
          placeholder="Enter Listing Title"
          id="title"
          name="title"
          className="text-black sm:p-3 p-1 w-[90%] rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1 animate-pulse">This field is required</span>
        )}
      </div>

      <div className="flex flex-col sm:mb-6 mb-2">
        <label htmlFor="description" className="text-white sm:text-lg sm:mb-2 text-xs mb-1">
          Description
        </label>
        <textarea
          placeholder="Enter Listing Description"
          id="description"
          name="description"
          className="text-black sm:p-3 p-1 w-[90%] rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1 animate-pulse">This field is required</span>
        )}
      </div>

      <div className="flex flex-col sm:mb-6 mb-2">
        <label htmlFor="price" className="text-white sm:text-lg sm:mb-2 text-xs mb-1">
          Price
        </label>
        <input
          placeholder="Enter Listing Price"
          id="price"
          name="price"
          type="text"
          className="text-black sm:p-3 p-1 w-[90%] rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
          {...register("price", { required: true })}
        />
        {errors.price && (
          <span className="text-red-500 text-sm mt-1 animate-pulse">This field is required</span>
        )}
      </div>

      <div className="flex flex-col sm:mb-6 mb-2">
        <label htmlFor="file" className="text-white sm:text-lg sm:mb-2 text-xs mb-1">
          Choose an Image
        </label>
        <input
          id="file"
          name="file"
          type="file"
          className="border border-dashed border-gray-500 focus:outline-none text-black sm:p-3 p-1 w-[90%] rounded-md focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
          {...register("file", { required: true })}
        />
        {errors.file && (
          <span className="text-red-500 text-sm mt-1 animate-pulse">This field is required</span>
        )}
      </div>

      <div className="flex flex-col sm:mb-6 mb-2">
        <label htmlFor="location" className="text-white sm:text-lg sm:mb-2 text-xs mb-1">
          Location
        </label>
        <input
          placeholder="Enter Listing Location"
          id="location"
          name="location"
          type="text"
          className="text-black sm:p-3 p-1 w-[90%] rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
          {...register("location", { required: true })}
        />
        {errors.location && (
          <span className="text-red-500 text-sm mt-1 animate-pulse">This field is required</span>
        )}
      </div>

      <div className="flex flex-col sm:mb-6 mb-2">
        <label htmlFor="country" className="text-white sm:text-lg sm:mb-2 text-xs mb-1">
          Country
        </label>
        <input
          placeholder="Enter Listing Country"
          id="country"
          name="country"
          type="text"
          className="text-black sm:p-3 p-1 w-[90%] rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
          {...register("country", { required: true })}
        />
        {errors.country && (
          <span className="text-red-500 text-sm mt-1 animate-pulse">This field is required</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white sm:py-3 sm:px-6 mt-4 py-1 px-2  rounded-lg sm:w-full w-fit hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Create Listing
      </button>
    </form>
  );
};

export default CreateListing;
