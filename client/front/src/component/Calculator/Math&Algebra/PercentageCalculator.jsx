/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const PercentageCalculator = () => {
  const [originalValue, setOriginalValue] = useState("");
  const [percentageChange, setPercentageChange] = useState("");
  const [newValue, setNewValue] = useState(null);
  const [calculated, setCalculated] = useState(false); // Track if calculation is done

  const calculateNewValue = () => {
    if (originalValue === "" || percentageChange === "") {
      alert("Please enter both the original value and percentage change.");
      return;
    }

    const original = parseFloat(originalValue);
    const change = parseFloat(percentageChange);

    if (isNaN(original) || isNaN(change)) {
      alert("Please enter valid numbers.");
      return;
    }

    // Calculate the new value using the formula
    const calculatedValue = original * (1 + (change / 100));
    setNewValue(calculatedValue.toFixed(2)); // Set the new value to two decimal places
    setCalculated(true); // Set calculated to true after calculation
  };

  const clearFields = () => {
    setOriginalValue("");
    setPercentageChange("");
    setNewValue(null);
    setCalculated(false); // Reset calculated state
  };

  const calcTitle = "Percentage Calculator"
  const inputData= {originalValue: originalValue, percentageChange: percentageChange,}
  const resultData = newValue
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
    <div className='relative h-full w-full flex justify-center items-start lg:items-center'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Percentage Calculator</h2>
        <input
          type="number"
          value={originalValue}
          onChange={(e) => setOriginalValue(e.target.value)}
          placeholder="Enter Original Value"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={percentageChange}
          onChange={(e) => setPercentageChange(e.target.value)}
          placeholder="Enter Percentage Change"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateNewValue} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {newValue !== null && (
          <div className='lg:flex flex-col items-start mt-4'>
            <h3 className='text-2xl'>New Value:</h3>
            <p className='bg-white px-12 py-1 border border-green-500 rounded-md'>{newValue}</p>
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

export default PercentageCalculator;
