/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const BodyFatCalculator = () => {
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = () => {
    const weightInKg = parseFloat(weight);
    const waistInCm = parseFloat(waist);
    if (weightInKg > 0 && waistInCm > 0) {
      const bodyFatPercentage = ((waistInCm * 0.74) - (weightInKg * 0.082) - 34.89) / weightInKg * 100;
      setBodyFat(bodyFatPercentage.toFixed(2));
    }
  };

  const clearFields = () => {
    setWeight('');
    setWaist('');
    setBodyFat(null);
  };

  const calcTitle = "BodyFat Calculator"
  const inputData={weight:parseFloat(weight), waist:parseFloat(waist)}
  const resultData = bodyFat
  const submitData = async () => {
    try {
      // Send the simplified expression to the backend
      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:resultData,
        inputs:inputData
      }, {
        withCredentials: true, // Include credentials if necessary
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Body Fat Calculator</h2>
        <div className='w-full'>
          <label className='block text-sm font-medium mb-2'>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
          />
        </div>
        <div className='w-full'>
          <label className='block text-sm font-medium mb-2'>Waist Circumference (cm)</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
          />
        </div>
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateBodyFat} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {bodyFat && (
          <>
            <div className='lg:flex mt-4'>
              <h3 className='text-2xl'>Your Body Fat Percentage:</h3>
              <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{bodyFat}%</p>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                onClick={submitData}
                className='bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md'
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BodyFatCalculator;
