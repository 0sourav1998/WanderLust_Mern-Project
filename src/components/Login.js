import React, { useState } from "react";
import { login } from "../services/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    dispatch(login({ email: email, password: password }, navigate));
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="sm:h-[400px] sm:w-[500px] h-fit w-fit bg-gray-800 rounded-lg shadow-lg shadow-slate-500 flex flex-col justify-center items-center">
        <h2 className="sm:text-3xl text-xl text-white sm:mb-6 mb-4">Login</h2>
        <div className="flex flex-col sm:w-[70%] w-[80%]">
          <label htmlFor="email" className="text-white sm:text-lg sm:mb-2 text-sm mb-1">
            Enter Your Email
          </label>
          <input
            id="email"
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 text-black text-sm rounded-lg mb-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col sm:w-[70%] w-[80%]">
          <label htmlFor="password" className="text-white sm:text-lg sm:mb-2 text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            placeholder="Enter Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 text-black text-sm rounded-lg mb-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="text-white rounded-lg bg-green-500 py-2 px-6 sm:mt-6 mt-2 sm:mb-0 mb-2 hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
        >
          Login
        </button>
      </div>
      <p className="text-white sm:mt-6 mt-2">
        Don't have an account?{" "}
        <span
          className="sm:text-lg text-sm text-green-400 cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          Signup now
        </span>
      </p>
    </div>
  );
};

export default Login;
