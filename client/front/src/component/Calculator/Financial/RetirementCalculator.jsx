/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back';
import axios from 'axios';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [futureValue, setFutureValue] = useState(null);

  const calculateRetirement = () => {
    const ageDiff = retirementAge - currentAge;
    const rate = interestRate / 100 / 12;
    const n = ageDiff * 12;
    const p = parseFloat(currentSavings);
    const pm = parseFloat(monthlySavings);
    
    const futureValue = p * Math.pow(1 + rate, n) + pm * ((Math.pow(1 + rate, n) - 1) / rate);
    setFutureValue(futureValue.toFixed(2));
  };

  const clearFields = () => {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setMonthlySavings('');
    setInterestRate('');
    setFutureValue(null);
  };

  const calcTitle = "Retirement Calculator"
  const inputData= {currentAge: currentAge,retirementAge:retirementAge,currentSavings:currentSavings,monthlySavings:monthlySavings,}
  const resultData = futureValue
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Retirement Calculator</h2>
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Current Age:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="Enter current age"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Retirement Age:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="Enter retirement age"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Current Savings:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="Enter current savings"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Monthly Savings:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(e.target.value)}
              placeholder="Enter monthly savings"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Annual Interest Rate (%):</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter annual interest rate"
            />
          </div>
          <div className="flex w-full justify-between items-center mt-4">
            <button
              type="button"
              onClick={calculateRetirement}
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
          {futureValue !== null && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Future Value: ${futureValue}</h3>
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
    </div>
  );
};

export default RetirementCalculator;
