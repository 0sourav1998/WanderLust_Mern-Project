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
      <div className="h-[400px] w-[500px] bg-gray-800 rounded-lg shadow-lg shadow-slate-500 flex flex-col justify-center items-center">
        <h2 className="text-3xl text-white mb-6">Login</h2>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="email" className="text-white text-lg mb-2">
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
        <div className="flex flex-col w-[70%]">
          <label htmlFor="password" className="text-white text-lg mb-2">
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
          className="text-white rounded-lg bg-green-500 py-2 px-6 mt-6 hover:bg-green-600 transition duration-300 ease-in-out shadow-md"
        >
          Login
        </button>
      </div>
      <p className="text-white mt-6">
        Don't have an account?{" "}
        <span
          className="text-lg text-green-400 cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          Signup now
        </span>
      </p>
    </div>
  );
};

export default Login;
