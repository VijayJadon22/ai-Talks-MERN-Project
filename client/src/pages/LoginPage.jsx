import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required", { id: "formData" });
      return;
    }
    dispatch(loginUser(formData));
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-74px)] w-full">
      <form
        onSubmit={handleSubmit}
        className="min-w-sm md:min-w-sm p-4 flex flex-col items-center space-y-8 shadow-2xl rounded-xl"
      >
        <h1 className="text-3xl font-bold">Login Form</h1>

        <div className="w-full border border-gray-300 rounded-lg">
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            placeholder="Email"
            className="h-12 w-full px-2 outline-none"
          />
        </div>
        <div className="w-full border border-gray-300 rounded-lg">
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            placeholder="Password"
            className="h-12 w-full px-2 outline-none"
          />
        </div>
        <p className="">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="underline text-blue-500 font-semibold"
          >
            Signup
          </Link>
        </p>
        <button
          type="submit"
          className="md:w-1/3 py-2 px-4 rounded-lg text-white bg-blue-500 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
