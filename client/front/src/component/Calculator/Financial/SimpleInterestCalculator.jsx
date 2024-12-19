/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back'; 
import axios from 'axios';


const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(null);

  const calculateInterest = () => {
    const result = (principal * rate * time) / 100;
    setInterest(result.toFixed(2));
  };

  const clearFields = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest(null);
  };

  const calcTitle = "Simple Interest Calculator"
  const inputData= {principal:principal, rate:rate, time:time}
  const resultData = interest
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
    <div className="h-full w-full flex justify-center items-start lg:items-center relative">
      <BackButton className="absolute top-4 left-4 md:top-6 md:left-6" />
      <div className="flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]">
        <h2 className="text-2xl text-center font-semibold tracking-tight">Simple Interest Calculator</h2>
        <form className="flex flex-col gap-4 w-full">
          <label className="block text-gray-700">Principal:</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal amount"
          />
          <label className="block text-gray-700">Rate of Interest (%):</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
          />
          <label className="block text-gray-700">Time (Years):</label>
          <input
            type="number"
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in years"
          />
          <div className="flex w-full justify-between items-center mt-4">
            <button
              type="button"
              onClick={calculateInterest}
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </form>
        {interest !== null && (
          <div className="mt-4">
            <h3 className="text-2xl">Simple Interest:</h3>
            <p className="bg-white px-12 py-1 border border-green-500 rounded-md">
              ${interest}
            </p>
            <button
                onClick={submitData}
                className="bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md mt-4"
              >
                Submit
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleInterestCalculator;
