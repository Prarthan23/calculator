/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back'; 

import axios from 'axios';

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [years, setYears] = useState('');
  const [futureValue, setFutureValue] = useState(null);

  const calculateInvestment = () => {
    const p = parseFloat(initialInvestment);
    const r = parseFloat(annualReturn) / 100;
    const n = parseFloat(years);

    const futureValue = p * Math.pow(1 + r, n);
    setFutureValue(futureValue.toFixed(2));
  };

  const clearFields = () => {
    setInitialInvestment('');
    setAnnualReturn('');
    setYears('');
    setFutureValue(null);
  };

  const calcTitle = "Investment Calculator"
  const inputData= {initialInvestment: initialInvestment,annualReturn: annualReturn, years: years}
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Investment Calculator</h2>
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Initial Investment:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="Enter initial investment"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Annual Return (%):</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              placeholder="Enter annual return"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number of Years:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Enter number of years"
            />
          </div>
          <div className="flex w-full justify-between items-center mt-4">
            <button
              type="button"
              onClick={calculateInvestment}
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

export default InvestmentCalculator;
