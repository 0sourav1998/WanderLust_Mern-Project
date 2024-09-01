import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "./apis";
import { setImage, setToken, setUser } from "../slice/user";

const { LOGIN, SIGNUP, UPLOAD_IMAGE } = authEndpoints;

export const SignUp = async (body, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector("POST", SIGNUP, body);
    if (res?.data?.success) {
      toast.success("Sign Up Successfully");
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Sign Up Failed");
  }
  toast.dismiss(toastId);
};

export const login = (body, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      console.log("hello2")
      const res = await apiConnector("POST", LOGIN, body);
      console.log("hello3")
      if (res?.data?.success) {
        toast.success("Login Successfully");
          dispatch(setToken(res?.data?.token));
          dispatch(setUser(res?.data?.user));
          sessionStorage.setItem("token", JSON.stringify(res?.data?.token));
          sessionStorage.setItem("user", JSON.stringify(res?.data?.user));
          if(res?.data?.user?.image){
            dispatch(setImage(res?.data?.user.image));
            sessionStorage.setItem("image", JSON.stringify(res?.data?.user?.image));
            navigate("/dashboard/all")
          }else{
            navigate("/userimage");
          }
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Login Failed");
    }
    toast.dismiss(toastId);
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(setUser(null));
      dispatch(setToken(null));
      dispatch(setImage(null));
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("image");
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("Logout failed");
    }
  };
};

export const uploadImage = (body, navigate) => {
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPLOAD_IMAGE, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.success) {
          dispatch(setImage(response?.data?.image));
          sessionStorage.setItem("image", JSON.stringify(response?.data?.image));
          navigate("/dashboard/all");
      }
    } catch (error) {
      console.error(error.message);
    }finally{
      toast.dismiss(toastId)
    }
  }
};
