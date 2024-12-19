/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const RectangleCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [area, setArea] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [submitted, setSubmitted] = useState(false); // New state for submission

  const calculateRectangle = () => {
    if (length === "" || width === "") {
      alert("Please fill in all fields.");
      return;
    }
    const l = parseFloat(length);
    const w = parseFloat(width);
    const calculatedArea = l * w;
    const calculatedPerimeter = 2 * (l + w);
    setArea(calculatedArea.toFixed(2));
    setPerimeter(calculatedPerimeter.toFixed(2));
    setSubmitted(false); // Reset submitted state on recalculation
  };

  const clearFields = () => {
    setLength("");
    setWidth("");
    setArea(null);
    setPerimeter(null);
    setSubmitted(false); // Reset submitted state on clearing
  };

  const calcTitle = "Rectangle Calculator"
  const inputData={length:length, width:width}
  const resultData = {area:area, perimeter:perimeter}
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Rectangle Calculator</h2>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Enter Length"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Enter Width"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateRectangle} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
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
        {perimeter !== null && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Perimeter:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{perimeter}</p>
          </div>
        )}
        {(area !== null && perimeter !== null && !submitted) && (
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

export default RectangleCalculator;
