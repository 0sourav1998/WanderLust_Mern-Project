import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import {ratingReviewEndpoint} from "../services/apis"

const {CREATE_RATING_REVIEW , FETCH_ALL , DELETE_REVIEW , FETCH_REVIEW , EDIT_REVIEW} = ratingReviewEndpoint;

export const createRatings = async(body)=>{
    const toastId = toast.loading("Loading...");
    let result ;
    try{
        const res = await apiConnector("POST",CREATE_RATING_REVIEW,body);
        console.log(res)
        if(res?.data?.success){
            toast.success("Review Given")
            result = res?.data?.review
        }
    }catch(error){
        console.error(error.message);
        toast.error("Failed to give review")
    }finally{
        toast.dismiss(toastId)
    }
    return result ;
}

export const fetchAllReview = async()=>{
    let result;
    try{
        const res = await apiConnector("GET",FETCH_ALL);
        console.log("RES",res)
        if(res?.data?.success){
            result = res?.data?.result;
        }
    }catch(error){
        console.error(error.message);
    }
    return result ;
}

export const deleteReview = async(body)=>{
    const toastId = toast.loading("Loading...");
    let result ;
    try{
        const response = await apiConnector("DELETE",DELETE_REVIEW,body);
        if(response?.data?.success){
            result = response?.data?.ratingAndReviews;
            toast.success("Review Deleted")
        }
    }catch(error){
        console.error(error.message);
        toast.error("Failed to Delete")
    }finally{
        toast.dismiss(toastId);
    }
    return result ;
}

export const fetchReview = async(body)=>{
    let result;
    try{
        const res = await apiConnector("POST",FETCH_REVIEW,body);
        if(res?.data?.success){
            result = res?.data?.response;
        }
    }catch(error){
        console.error(error.message);
    }
    return result ;
}

export const editReview = async(body) =>{
    const toastId = toast.loading("Loading...");
    let result;
    try{
        const res = await apiConnector("PUT",EDIT_REVIEW,body);
        if(res?.data?.success){
            result = res?.data?.ratingAndReview;
            toast.success("Review Edited")
        }
    }catch(error){
        console.error(error.message);
        toast.error("Failed to Edit")
    }finally{
        toast.dismiss(toastId)
    }
    return result ;
}