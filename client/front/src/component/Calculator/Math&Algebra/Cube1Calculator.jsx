// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const CubeCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  const calculateCube = () => {
    if (number === "") {
      alert("Please enter a number.");
      return;
    }

    const num = parseFloat(number);

    if (isNaN(num)) {
      alert("Please enter a valid number.");
      return;
    }

    const cubeResult = Math.pow(num, 3);
    setResult(cubeResult.toFixed(2)); // Limit to two decimal places
  };

  const clearFields = () => {
    setNumber("");
    setResult(null);
  };
  const calcTitle = "Cube Calculator"
  const inputData= number
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Cube Calculator</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a Number"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateCube} className='bg-red-700 text-xl uppercase py-1 px-6 text-white rounded-md'>
            CALCULATE
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Clear
          </button>
        </div>
        {result !== null && (
          <div className='lg:flex flex-col items-start mt-4'>
            <h3 className='text-2xl'>Result:</h3>
            <p className='bg-white px-4 py-2 border border-green-500 rounded-md text-lg'>
              {result}
            </p>
            {/* Additional button shown after calculation */}
            <button onClick={submitData} className='mt-4 bg-green-500 text-xl uppercase py-1 px-6 text-white rounded-md'>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CubeCalculator;
