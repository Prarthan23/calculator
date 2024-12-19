/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const Distance3DCalculator = () => {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [z1, setZ1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [z2, setZ2] = useState("");
  const [distance, setDistance] = useState(null);
  const [submitted, setSubmitted] = useState(false); // New state for submission

  const calculateDistance = () => {
    if (x1 === "" || y1 === "" || z1 === "" || x2 === "" || y2 === "" || z2 === "") {
      alert("Please fill in all fields before performing the calculation.");
      return;
    }
    const dx = parseFloat(x2) - parseFloat(x1);
    const dy = parseFloat(y2) - parseFloat(y1);
    const dz = parseFloat(z2) - parseFloat(z1);
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    setDistance(dist.toFixed(2));
    setSubmitted(false); // Reset submitted state on recalculation
  };

  const clearFields = () => {
    setX1("");
    setY1("");
    setZ1("");
    setX2("");
    setY2("");
    setZ2("");
    setDistance(null);
    setSubmitted(false); // Reset submitted state on clearing
  };

  const calcTitle = "Distance 3d Calculator"
  const inputData={x1: parseFloat(x1), y1: parseFloat(y1),z1:parseFloat(z1), x2:parseFloat(x2), y2:parseFloat(y2),z2:parseFloat(z2)}
  const submitData = async () => {
    try {
      
      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:distance,
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>3D Distance Calculator</h2>
        <input
          type="number"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
          placeholder="Enter X1"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={y1}
          onChange={(e) => setY1(e.target.value)}
          placeholder="Enter Y1"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={z1}
          onChange={(e) => setZ1(e.target.value)}
          placeholder="Enter Z1"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={x2}
          onChange={(e) => setX2(e.target.value)}
          placeholder="Enter X2"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={y2}
          onChange={(e) => setY2(e.target.value)}
          placeholder="Enter Y2"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={z2}
          onChange={(e) => setZ2(e.target.value)}
          placeholder="Enter Z2"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateDistance} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {distance !== null && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Distance:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{distance}</p>
          </div>
        )}
        {(distance !== null && !submitted) && (
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

export default Distance3DCalculator;
