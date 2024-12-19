/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const SphereCalculator = () => {
  const [radius, setRadius] = useState("");
  const [volume, setVolume] = useState(null);
  const [surfaceArea, setSurfaceArea] = useState(null);

  const calculateSphere = () => {
    if (radius === "") {
      alert("Please enter the radius.");
      return;
    }
    const r = parseFloat(radius);
    const calculatedVolume = (4 / 3) * Math.PI * Math.pow(r, 3);
    const calculatedSurfaceArea = 4 * Math.PI * Math.pow(r, 2);
    setVolume(calculatedVolume.toFixed(2));
    setSurfaceArea(calculatedSurfaceArea.toFixed(2));
  };

  const clearFields = () => {
    setRadius("");
    setVolume(null);
    setSurfaceArea(null);
  };

  const calcTitle = "SphereCalculator"
  const inputData=radius
  const resultData = {volume:volume, surfaceArea:surfaceArea,}
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Sphere Calculator</h2>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Enter Radius"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateSphere} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {volume !== null && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Volume:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{volume}</p>
          </div>
        )}
        {surfaceArea !== null && (
          <div className='lg:flex'>
            <h3 className='text-2xl'>Surface Area:</h3>
            <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{surfaceArea}</p>
          </div>
        )}
        {(volume !== null || surfaceArea !== null) && (
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

export default SphereCalculator;
