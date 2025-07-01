import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="w-full min-h-18 bg-cyan-700  text-white flex justify-between items-center px-4 lg:px-12">
      <Link
        to={"/"}
        className="flex items-center justify-between cursor-pointer"
      >
        <img src="/ai-bot.png" alt="bot-image" className="w-15" />
        <span className="font-semibold">Ai Talks</span>
      </Link>
      <ul className="flex items-center gap-4 lg:gap-8">
        <Link
          to={"/"}
          className="hidden sm:block cursor-pointer hover:text-cyan-300 font-semibold text-sm md:text-base "
        >
          Home
        </Link>
        {user && (
          <Link
            to={"/dashboard"}
            className="cursor-pointer hover:text-cyan-300 font-semibold text-sm md:text-base "
          >
            Dashboard
          </Link>
        )}
        {user && (
          <Link
            to={"/history"}
            className="cursor-pointer hover:text-cyan-300 font-semibold text-sm md:text-base "
          >
            History
          </Link>
        )}
        {user ? (

          <div className="relative group cursor-pointer hover:text-cyan-300">
            <p className="drop-shadow flex items-center gap-1 font-semibold text-md ">
              <span className="font-semibold text-md ">
                Hi,{" "}
              </span>{" "}
              {user.username.split(" ")[0]}
            </p>
            <div className="absolute hidden group-hover:block -top-5 -right-5 z-10 text-black rounded pt-12 font-semibold text-sm">
              <ul className="list-none m-0 p-2 bg-gray-300 rounded-md shadow-2xl text-sm">
                <li
                  onClick={handleLogout}
                  className="py-1 px-2 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="cursor-pointer hover:text-cyan-300 font-semibold text-sm md:text-base "
          >
            Login
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
