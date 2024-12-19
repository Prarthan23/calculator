import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from "../../assets/allin1logo.png";

const Footer = () => {
  return (
    <div className='pt-8'>
      <footer className="bg-gray-800 text-white py-8 px-5">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-8 md:space-y-0">
          
          {/* Left Side - Logo and Description */}
          <div className="flex flex-col items-center text-center mb-6 md:mb-0">
            <img src={logo} className='w-[8rem] h-auto invert mb-4' alt="Logo" />
            <p className="text-xs max-w-xs">
              Welcome to the All-in-One Calculator, your comprehensive solution for all your calculation needs. Explore our range of calculators, designed to provide accurate results for various tasks.
            </p>
          </div>

          {/* Center - Calculator Links */}
          <div className="text-xs flex flex-col items-center space-y-2 md:order-2">
            <h3 className="text-lg font-semibold mb-4">Our Calculators</h3>
            <Link to="/calculator/basic" className="hover:text-gray-400">Basic Calculator</Link>
            <Link to="/calculator/scientific" className="hover:text-gray-400">Scientific Calculator</Link>
            <Link to="/calculator/bmi" className="hover:text-gray-400">BMI Calculator</Link>
            <Link to="/calculator/loan" className="hover:text-gray-400">Loan Calculator</Link>
            <Link to="/calculator/currency" className="hover:text-gray-400">Currency Converter</Link>
            {/* Add more calculator links as needed */}
          </div>

          {/* Right Side - Social Media Icons */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 md:order-3">
            <div className="flex justify-center md:justify-start mb-4 space-x-6">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://youtube.com" className="hover:text-gray-400">
                <FaYoutube size={24} />
              </a>
            </div>
            <div className="text-xs space-y-2">
              <Link to="/privacy" className="block hover:text-gray-400">Privacy Policy</Link>
              <Link to="/terms" className="block hover:text-gray-400">Terms & Conditions</Link>
              <Link to="/contact" className="block hover:text-gray-400">Feedback</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
