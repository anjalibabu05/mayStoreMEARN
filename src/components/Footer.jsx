import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

 const Footer = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-blue-950 text-white px-10 py-8">
      {/* About Us */}
      <div>
        <h3 className="text-xl font-semibold mb-3">ABOUT US</h3>
        <p className="text-sm leading-relaxed text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus atque consequuntur expedita assumenda unde dignissimos
          blanditiis est. Ducimus, repudiandae fugiat.
        </p>
      </div>

      {/* Newsletter */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold mb-3">SUBSCRIBE</h3>
        <div className="flex w-full max-w-sm">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-l-lg text-black bg-amber-50 focus:outline-none"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex flex-col items-center md:items-end">
        <h3 className="text-xl font-semibold mb-2">FOLLOW US</h3>
        <p className="text-sm text-gray-300 mb-3">Let us be Social</p>
        <div className="flex space-x-4 text-2xl">
          <a href="#" className="hover:text-pink-500 transition">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="hover:text-blue-500 transition">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer