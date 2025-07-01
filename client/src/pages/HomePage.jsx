import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center p-6 ">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{once:true}}
        className="text-6xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-red-400 to-emerald-400 bg-clip-text text-transparent  leading-tight text-center ">
        Your AI Chat Partner
      </motion.h1>
      <Link
        to={"/dashboard"}
        className="px-8 py-2 bg-cyan-600 text-white font-semibold rounded-full mt-6 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Chat now !
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{opacity:1,y:0}}
        transition={{duration:1}}
        viewport={{once:true}}
        className="w-full md:flex items-center justify-between gap-5">
        <div className="flex items-center justify-center">
          <img src="/ai-robo-1.webp" alt="robo-image" className="max-w-80" />
        </div>
        <p className="md:w-80 font-semibold text-lg">
          Hi there! I'm your friendly AI companion, here to listen, learn, and
          help. Whether you've got questions, need ideas, or just want to chat,
          I'm just a message away. Let's explore, create, and solve together one
          thoughtful prompt at a time
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
