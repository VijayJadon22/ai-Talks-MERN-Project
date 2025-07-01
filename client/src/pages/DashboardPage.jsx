import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearResponse,
  generateFeedback,
} from "../features/feedback/feedbackSlice";

const DashboardPage = () => {
  const [input, setInput] = useState("");
  const { response, isLoading } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Enter prompt to chat", { id: "prompt" });
    }
    dispatch(clearResponse());
    dispatch(generateFeedback({ prompt: input }));
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent mb-8"
        >
          Ask me anything !
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-[50vh] mb-6 bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg rounded-xl p-8 text-amber-950 text-sm overflow-hidden"
        >
          {response ? (
            <p>{response.trim()}</p>
          ) : isLoading ? (
            <div className="flex flex-col items-center">
              <p className="text-2xl ">Loading...</p>
              <img src="/ai-bot.png" alt="botimage" className="w-40" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-center">
                Hi there! I'm your friendly AI companion, here to listen, learn,
                and help. Whether you've got questions, need ideas, or just want
                to chat, I'm just a message away. Let's explore, create, and
                solve together one thoughtful prompt at a time!
              </p>
              <img src="/ai-bot.png" alt="robo-image" className="w-40"/>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-xl flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 "
        >
          {response ? (
            <button
              onClick={() => {
                dispatch(clearResponse());
                setInput("");
              }}
              className="bg-black h-12 w-1/2  px-6 text-white rounded-lg  hover:bg-gray-500 transition duration-200 text-lg font-semibold cursor-pointer"
            >
              New chat
            </button>
          ) : (
            <>
              <input
                type="text"
                name="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="h-12 w-full px-4 outline-none border border-gray-300 rounded-lg sm:rounded-lg sm:rounded-l-lg sm:rounded-r-none"
              />
              <button
                disabled={isLoading}
                className="bg-blue-400 h-12 w-full sm:w-auto px-6 text-white rounded-lg sm:rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-500 transition duration-200 text-lg font-semibold cursor-pointer"
              >
                {isLoading ? "Loading..." : "Search"}
              </button>
            </>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default DashboardPage;
