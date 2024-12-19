/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const RightAngledTriangleCalculator = () => {
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [area, setArea] = useState(null);
  const [hypotenuse, setHypotenuse] = useState(null);

  const calculateRightAngledTriangle = () => {
    if (base === "" || height === "") {
      alert("Please fill in all fields.");
      return;
    }
    const b = parseFloat(base);
    const h = parseFloat(height);
    const calculatedArea = 0.5 * b * h;
    const calculatedHypotenuse = Math.sqrt(b * b + h * h);
    setArea(calculatedArea.toFixed(2));
    setHypotenuse(calculatedHypotenuse.toFixed(2));
  };
  const clearFields = () => {
    setBase("");
    setHeight("");
    setArea(null);
    setHypotenuse(null);
  }

  const calcTitle = "RightAngled Triangle Calculator"
  const inputData={base:base, height:height}
  const resultData = {area:area, hypotenuse:hypotenuse}
  const submitData = async () => {
    try {
      
      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:resultData,
        inputs:inputData
      }, {
        withCredentials: true, 
      });
      alert('Result Saved successfully');
      clearFields();
    } catch (error) {
      console.error('Error submitting results:', error);
      alert('Error submitting results');
    }
  };

  return (
    <div className='h-full w-full flex justify-center items-start lg:items-center relative'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Right-Angled Triangle Calculator</h2>
        <input
          type="number"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          placeholder="Enter Base"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter Height"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateRightAngledTriangle} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {area !== null && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Area:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{area}</p>
          </div>
        )}
        {hypotenuse !== null && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Hypotenuse:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{hypotenuse}</p>
          </div>
        )}
        {(area !== null && hypotenuse !== null) && (
          <div className='flex justify-center mt-4'>
            <button
              onClick={submitData}
              className='bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md'
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightAngledTriangleCalculator;
