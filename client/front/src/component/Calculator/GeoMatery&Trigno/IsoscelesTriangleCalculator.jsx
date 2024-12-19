/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const IsoscelesTriangleCalculator = () => {
  const [base, setBase] = useState("");
  const [side, setSide] = useState("");
  const [area, setArea] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [submitted, setSubmitted] = useState(false); // New state for submission

  const calculateIsoscelesTriangle = () => {
    if (base === "" || side === "") {
      alert("Please fill in all fields.");
      return;
    }
    const b = parseFloat(base);
    const s = parseFloat(side);
    const height = Math.sqrt(s * s - (b / 2) * (b / 2));
    const calculatedArea = (b * height) / 2;
    const calculatedPerimeter = 2 * s + b;
    setArea(calculatedArea.toFixed(2));
    setPerimeter(calculatedPerimeter.toFixed(2));
    setSubmitted(false); // Reset submitted state on recalculation
  };

  const clearFields = () => {
    setBase("");
    setSide("");
    setArea(null);
    setPerimeter(null);
    setSubmitted(false); // Reset submitted state on clearing
  };

  const calcTitle = "IsoScles Triangle Calculator"
  const inputData={base:base, side:side}
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Isosceles Triangle Calculator</h2>
        <input
          type="number"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          placeholder="Enter Base Length"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={side}
          onChange={(e) => setSide(e.target.value)}
          placeholder="Enter Side Length"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateIsoscelesTriangle} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
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

export default IsoscelesTriangleCalculator;
