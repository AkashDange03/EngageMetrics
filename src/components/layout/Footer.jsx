import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <p className="text-gray-400">
            Revolutionize Social Media Insights with Langflow and DataStax
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to={"/"} onClick={scrollToTop}>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Features
                </button>
              </Link>
              <Link to={"/"} onClick={scrollToTop}>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Team
                </button>
              </Link>

              <Link to={"/dashboard"} onClick={scrollToTop}>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email:akashdange0307.com</p>
              <p>Location:Kalyan, mumbai</p>
            </div>
          </div>

         
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center md:text-left">
            © 2024 Insightly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
