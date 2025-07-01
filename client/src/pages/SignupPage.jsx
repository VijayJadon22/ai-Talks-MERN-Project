import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../features/auth/authSlice";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required", { id: "formData" });
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be 6 character long", { id: "formData" });
      return;
    }
    dispatch(registerUser(formData));
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-74px)] w-full">
      <form
        onSubmit={handleSubmit}
        className="min-w-sm md:min-w-sm p-4 flex flex-col items-center space-y-8 shadow-2xl rounded-xl"
      >
        <h1 className="text-3xl font-bold">Signup Form</h1>
        <div className="w-full border border-gray-300 rounded-lg ">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="h-12 w-full px-2 outline-none"
          />
        </div>
        <div className="w-full border border-gray-300 rounded-lg">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="h-12 w-full px-2 outline-none"
          />
        </div>
        <div className="w-full border border-gray-300 rounded-lg">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="h-12 w-full px-2 outline-none"
          />
        </div>
        <p className="">
          Already have an account?{" "}
          <Link to={"/login"} className="underline text-blue-500 font-semibold">
            Login
          </Link>
        </p>
        <button
          type="submit"
          className="md:w-1/3 py-2 px-4 rounded-lg text-white bg-blue-500 cursor-pointer"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
