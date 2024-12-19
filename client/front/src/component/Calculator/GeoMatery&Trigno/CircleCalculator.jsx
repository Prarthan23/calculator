/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const CircleCalculator = () => {
  const [radius, setRadius] = useState("");
  const [area, setArea] = useState(null);
  const [circumference, setCircumference] = useState(null);

  const calculate = () => {
    const r = parseFloat(radius);
    const a = Math.PI * r * r;
    const c = 2 * Math.PI * r;
    setArea(a.toFixed(2));
    setCircumference(c.toFixed(2));
  };

  const clearFields = () => {
    setRadius("");
    setArea(null);
    setCircumference(null);
  };

  const calcTitle = "Circle Calculator"
  const resultdata = {area: area, circumference: circumference}
  const submitData = async () => {
    try {
      
      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:resultdata,
        inputs:radius
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
      {/* Hide BackButton on small screens */}
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Circle Calculator</h2>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Enter Radius"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculate} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        
        {area && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Area:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{area}</p>
          </div>
        )}
        {circumference && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Circumference:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{circumference}</p>
          </div>
        )}
        {area !== null && circumference !== null && (
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

export default CircleCalculator;
