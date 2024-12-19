/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const ScaleneTriangleCalculator = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [area, setArea] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [submitted, setSubmitted] = useState(false); // New state for submission

  const calculateScaleneTriangle = () => {
    if (sideA === "" || sideB === "" || sideC === "") {
      alert("Please fill in all fields.");
      return;
    }
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    const s = (a + b + c) / 2;
    const calculatedArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const calculatedPerimeter = a + b + c;
    setArea(calculatedArea.toFixed(2));
    setPerimeter(calculatedPerimeter.toFixed(2));
    setSubmitted(false); // Reset submitted state on recalculation
  };

  const clearFields = () => {
    setSideA("");
    setSideB("");
    setSideC("");
    setArea(null);
    setPerimeter(null);
    setSubmitted(false); // Reset submitted state on clearing
  };

  const calcTitle = "Scalene Triangle Calculator"
  const inputData={sideA:sideA, sideB:sideB, sideC:sideC}
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Scalene Triangle Calculator</h2>
        <input
          type="number"
          value={sideA}
          onChange={(e) => setSideA(e.target.value)}
          placeholder="Enter Side A"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={sideB}
          onChange={(e) => setSideB(e.target.value)}
          placeholder="Enter Side B"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={sideC}
          onChange={(e) => setSideC(e.target.value)}
          placeholder="Enter Side C"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateScaleneTriangle} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
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

export default ScaleneTriangleCalculator;
