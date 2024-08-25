import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { listingEndpoints } from "./apis";

const {ALLLISTINGS,CREATE_LISTING} = listingEndpoints ;

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