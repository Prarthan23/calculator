/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back';
import axios from 'axios';

const ExponentCalculator = () => {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState(null);

  const calculateExponent = () => {
    const expResult = Math.pow(base, exponent);
    setResult(expResult.toFixed(4));
  };

  const clearFields = () => {
    setBase('');
    setExponent('');
    setResult(null);
  };

  const calcTitle = "Exponent Calculator"
  const inputData= {base: base,exponent: exponent}
  const resultData = result
  const submitData = async () => {
    try {

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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Exponent Calculator</h2>
        <div className='mb-4'>
          <label className='block text-gray-700'>Base:</label>
          <input
            type="number"
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="Enter base"
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Exponent:</label>
          <input
            type="number"
            className='ring-1 ring-gray-500 p-1 w-full rounded-md'
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
            placeholder="Enter exponent"
          />
        </div>
        <div className='flex flex-wrap w-full justify-between items-center space-x-1'>
          <button
            className='bg-red-700 text-xl uppercase py-1 px-3 text-white rounded-md'
            onClick={calculateExponent}
          >
            Calculate
          </button>
          <button
            className='bg-blue-400 text-xl uppercase py-1 px-3 text-white rounded-md'
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
        
        {result && (
          <>
            <div className='lg:flex mt-4'>
              <h3 className='text-2xl'>Result:</h3>
              <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{result}</p>
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

export default ExponentCalculator;
