import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";
import ChatClient from "../../pages/ChatClient";
import { useState } from "react";

// Enhanced Hero Section
const Hero = () => {

  const [chatExpanded, setChatExpanded] = useState(false);

  // Function to handle AI button click
  const handleAiButtonClick = () => {
    setChatExpanded(true);
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative bg-gradient-to-br from-primary-50 via-white to-primary-50 mt-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto min-h-screen flex items-center px-4">


        <div className="flex flex-col gap-20 py-20">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            <div className="inline-flex justify-start gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              Langflow X OpenAI
            </div>

            <div className=" flex flex-col items-center gap-8">
              <div className="flex justify-center">
                <h1 className="text-center max-w-6xl text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Revolutionize Your
                  <span className="text-primary-600"> Social Media</span> <br /> Insights with Langflow and DataStax
                </h1>
              </div>



              <p className="text-xl text-center text-gray-600 max-w-xl">
                Leverage the power of AI analytics to elevate your social media presence, increase engagement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Get Started
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to=""
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-300 border border-primary-200">
                  View Demo
                  <ChartBar size={20} />
                </Link>
              </div>
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl blur-2xl opacity-20 transform rotate-3"></div>
            <img
              src="/hero.png"
              alt="Analytics Dashboard"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
      <ChatClient
       isExpanded={chatExpanded}
       setIsExpanded={setChatExpanded}
      />
    </section>
  );
};

export default Hero;
