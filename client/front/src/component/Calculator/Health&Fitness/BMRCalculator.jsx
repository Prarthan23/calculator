/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const BMRCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(null);

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseInt(age);
    let result;

    if (gender === 'male') {
      result = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageInYears);
    } else {
      result = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageInYears);
    }

    if (weightInKg > 0 && heightInCm > 0 && ageInYears > 0) {
      setBmr(result.toFixed(2));
    }
  };

  const clearFields = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender('male');
    setBmr(null);
  };

  const calcTitle = "BMR Calculator"
  const inputData={weight:weight, height:height,age:age, gender: gender}
  const resultData = bmr
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>BMR Calculator</h2>
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
          <label className='block text-sm font-medium mb-2'>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
          />
        </div>
        <div className='w-full'>
          <label className='block text-sm font-medium mb-2'>Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
          />
        </div>
        <div className='w-full'>
          <label className='block text-sm font-medium mb-2'>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateBMR} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {bmr && (
          <>
            <div className='lg:flex mt-4'>
              <h3 className='text-2xl'>Your BMR:</h3>
              <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{bmr}</p>
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

export default BMRCalculator;
