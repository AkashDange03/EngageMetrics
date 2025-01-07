import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Share2, Globe, LineChart, Target, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BarChart2 size={24} />,
      title: "Real-time Analytics",
      description:
        "Track your social media performance in real-time with comprehensive analytics and insights. Make data-driven decisions instantly.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Reach Analysis",
      description:
        "Understand your audience demographics and reach across different regions and platforms.",
    },
    {
      icon: <LineChart size={24} />,
      title: "Growth Tracking",
      description:
        "Monitor your follower growth, engagement rates, and content performance over time.",
    },
    {
      icon: <Target size={24} />,
      title: "Audience Insights",
      description:
        "Get detailed insights about your audience preferences, behaviors, and engagement patterns.",
    },
    {
      icon: <Share2 size={24} />,
      title: "GPT-powered Insights",
      description:
        "Leverage AI to generate content ideas, optimize posting times, and improve engagement.",
    },
    {
      icon: <Zap size={24} />,
      title: "Smart Automation",
      description:
        "Automate your social media workflow with intelligent scheduling and posting features.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed on social media, powered by
            cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
