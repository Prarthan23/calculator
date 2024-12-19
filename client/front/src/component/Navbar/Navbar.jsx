/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import logo from "../../assets/allin1logo.png";
import axios from 'axios';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleProfile = () =>{
    navigate("/profile");
    setProfileDropdown(!profileDropdown);
  }

  const handleResults = () => {
    navigate("/results");
    setProfileDropdown(!profileDropdown);
  }

  const handleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      if (response.data.message) {
      navigate('/');
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = function () {
        alert('logged out');
        navigate('/'); // Redirect to the login page or another safe page
      };
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { id: 1, text: 'Home', path: '/Home' },
    { id: 2, text: 'Calculators', path: '/Cards' },
    { id: 3, text: 'Results', path: '/results' },
    { id: 4, text: 'About', path: '/about' },
    { id: 5, text: 'Contact', path: '/contact' },
  ];

  return (
    <div className='relative flex justify-between items-center h-16 md:h-20 shadow-bottom-side z-10 max-w-[1680px] mx-auto px-4 text-black'>
      {/* Logo with space (visible on larger screens) */}
      <img src={logo} className='w-[7rem] h-[8.5rem] md:w-[5rem] lg:w-[8rem] py-2 hidden md:block' alt="Logo" />

      {/* Desktop Navigation */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <ul className='hidden md:flex'>
          {navItems.map(item => (
            <li
              key={item.id}
              className='px-4 py-2 m-0 cursor-pointer transition-all duration-300 rounded'
            >
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={handleProfileDropdown}>
            <FaUserCircle size={28} className="text-gray-700 hover:text-gray-900" />
          </div>
          {profileDropdown && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/profile" onClick={handleProfile}>Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/results" onClick={handleResults}>Saved Results</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden z-20'>
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`nav-menu fixed md:hidden left-0 top-0 w-[60%] h-full border-r bg-white shadow-right-side z-50 ease-in-out duration-500 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile Logo */}
        <div className='flex items-center justify-center py-6'>
          <img src={logo} className='w-[8rem] h-auto' alt="Logo" />
        </div>

        {/* Mobile Profile Section */}
        <div className='flex justify-between items-center px-4 py-6 border-b border-gray-200'>
          <div className='flex items-center'>
            <FaUserCircle size={28} className="text-gray-700 hover:text-gray-900" />
            <Link to="/profile" className='ml-2' onClick={handleNav}>Profile</Link>
          </div>
        </div>

        {/* Mobile Navigation Items */}
        <div className="flex flex-col space-y-4">
          {navItems.map(item => (
            <li
              key={item.id}
              className='px-4 py-4 border-b border-gray-200 transition-all duration-300 rounded'
            >
              <Link to={item.path} onClick={handleNav}>{item.text}</Link>
            </li>
          ))}
          <li className='px-4 py-4 border-b border-gray-200 transition-all duration-300 rounded'>
            <Link to="/logout" onClick={handleNav}>Logout</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
