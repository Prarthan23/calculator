// src/components/BackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`absolute left-4 top-4 md:top-6 md:left-6 bg-gray-200 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300 ${className}`}
    >
      Back
    </button>
  );
};

export default BackButton;
