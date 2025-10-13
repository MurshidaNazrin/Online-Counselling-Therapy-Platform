import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-teal-700 to-teal-900 text-white py-12 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/*  About */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">MindLink</h2>
          {/* <img src="logo1.png" alt="" className="h-60 w-auto object-contain drop-shadow-md"/> */}
          <p className="text-gray-200 leading-relaxed text-sm">
            Empowering minds and nurturing emotional well-being through professional 
            online counselling and therapy. Your journey to mental wellness starts here.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-2 text-gray-200">
            <li><a href="#" className="hover:text-teal-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-teal-300 transition">About Us</a></li>
            <li><a href="#" className="hover:text-teal-300 transition">Our Therapists</a></li>
            <li><a href="#" className="hover:text-teal-300 transition">Services</a></li>
            <li><a href="#" className="hover:text-teal-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact and Socialmedia */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Get in Touch</h2>
          <p className="flex items-center gap-2 text-gray-200 text-sm mb-2">
            <FaEnvelope className="text-teal-300" /> support@mindlink.com
          </p>
          <p className="flex items-center gap-2 text-gray-200 text-sm mb-4">
            <FaPhone className="text-teal-300" /> +91 98765 43210
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-teal-500 transition">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-teal-500 transition">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-teal-500 transition">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-teal-500 transition">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-teal-600 mt-10"></div>

      {/* Copyright */}
      <div className="text-center text-gray-300 text-sm mt-4">
        © {new Date().getFullYear()} MindLink. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

