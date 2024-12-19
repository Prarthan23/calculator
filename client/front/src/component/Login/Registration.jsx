/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError((prevError) => ({ ...prevError, [e.target.name]: '' }));
  };

  const validation = () => {
    const { email, password, confirmPassword } = formData;
    let isValid = true;
    let newError = {};

    if (!email || !password || !confirmPassword) {
      newError.general = 'All fields are required.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newError.password = 'Passwords do not match.';
      isValid = false;
    } else if(password.length < 6 ){
      newError.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    try {
      const response = await axios.post(`http://localhost:3000/api/register`, {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true, // Ensures cookies are sent along with the request
    });

      if (response.status === 201) {
        setTimeout(()=>{
          navigate('/home');
        },2000)

      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      setError((prevError) => ({ ...prevError, general: errorMessage }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {error.general && <p className="text-red-500 text-center mb-4">{error.general}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
