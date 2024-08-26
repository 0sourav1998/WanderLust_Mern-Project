import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "./apis";
import { setToken, setUser } from "../slice/user";

const { LOGIN, SIGNUP } = authEndpoints;
console.log("Sign up", SIGNUP);

export const SignUp = async (body, navigate) => {
  const toastId = toast.loading("Loading...");
  console.log("one");
  try {
    console.log("two");
    const res = await apiConnector("POST", SIGNUP, body);
    console.log("three");
    console.log(res);
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
      const res = await apiConnector("POST", LOGIN, body);
      console.log("three");
      console.log(res);
      if (res?.data?.success) {
        toast.success("Login Successfully");
        navigate("/dashboard/all");
        dispatch(setToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        sessionStorage.setItem("token", JSON.stringify(res?.data?.token));
        sessionStorage.setItem("user", JSON.stringify(res?.data?.user));
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
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      toast.success("Logged Out");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      toast.error("Logout failed");
    }
  };
};
