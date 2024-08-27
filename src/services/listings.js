import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { listingEndpoints } from "./apis";

const {ALLLISTINGS,CREATE_LISTING,LISTING_DETAILS,USER_LISTINGS , ADD_BOOKMARK, FETCH_BOOKMARK_LISTING , REMOVE_BOOKMARK} = listingEndpoints ;

export const fetchAllListings = async()=>{
    const toastId = toast.loading("Loading...")
    let result ;
    try{
        const res = await apiConnector("GET",ALLLISTINGS);
        if(res?.data?.success){
            result = res?.data?.allListings ;
        }
    }catch(error){
        console.error(error.message)
    }
    toast.dismiss(toastId)
    return result ;
}

export const createListing = async(body,navigate)=>{
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST",CREATE_LISTING,body);
        if(response?.data?.success){
            toast.success("Listing Created Successfully");
            navigate("/dashboard/all")
        }
    }catch(error){
        console.error(error.message)
    }
    toast.dismiss(toastId)
}

export const fetchSpecificListing = async (body) => {
    let result;
    const toastId = toast.loading("Loading...");
  
    try {
      const res = await apiConnector("POST", LISTING_DETAILS, body);
      if (res?.data?.success) {
        result = res?.data?.listing;
      }
    } catch (error) {
      console.error("Error fetching listing details:", error.message);
      toast.error("Failed to load listing details. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  
    return result;
  };


  export const fetchUserListing = async (body) => {
    let result;
    const toastId = toast.loading("Loading...");
  
    try {
      const res = await apiConnector("POST", USER_LISTINGS, body);
      if (res?.data?.success) {
        result = res?.data?.user;
      }
    } catch (error) {
      console.error("Error fetching listing details:", error.message);
      toast.error("Failed to load listing details. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  
    return result;
  };

  export const addListingAsBookmark = async(body)=>{
    const toastId = toast.loading("Loading...");
    let result ;
    try{
      const response = await apiConnector("POST",ADD_BOOKMARK,body) ;
      console.log("Response",response)
      if(response?.data?.success){
        result = response?.data?.user?.bookmarkedListings ;
        toast.success("Bookmark Added");
      }
    }catch(error){
      console.error(error.message);
      toast.error("Bookmark Not Added")
    }finally{
      toast.dismiss(toastId)
    }
    return result ;
  }

  export const fetchBookmarkListing = async(body)=>{
    let result ;
    try{
      const response = await apiConnector("POST",FETCH_BOOKMARK_LISTING,body);
      console.log(response)
      if(response?.data?.success){
        result = response?.data?.user
      }
    }catch(error){
      console.error(error.message);
    }
    return result ;
  }

  


  export const removeBookmark = async(body)=>{
    let result ;
    try{
      const response = await apiConnector("POST",REMOVE_BOOKMARK,body);
      console.log(response)
      if(response?.data?.success){
        result = response?.data?.user?.bookmarkedListings
        toast.success("Bookmark Removed")
      }
    }catch(error){
      console.error(error.message);
    }
    return result ;
  }
  