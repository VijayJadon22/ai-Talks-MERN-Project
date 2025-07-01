import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../features/feedback/feedbackSlice";
import { motion } from "framer-motion";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { history, isLoading } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Feedback History
      </motion.h2>

      {isLoading ? (
        <p className="text-lg text-gray-600 animate-pulse ">
          Loading your last 5 chats...
        </p>
      ) : history.length === 0 ? (
        <p className="text-lg text-gray-600">No history found.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <p className="text-blue-700 font-semibold mb-2">
                👤 You:{" "}
                <span className="text-gray-800">{entry.user_input}</span>
              </p>
              <p className="text-green-800 font-semibold">
                🤖 AI: <span className="text-gray-800">{entry.feedback}</span>
              </p>
              <p className="text-xs text-gray-400 mt-2 text-right">
                {new Date(entry.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
