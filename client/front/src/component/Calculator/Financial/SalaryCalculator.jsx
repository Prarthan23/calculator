/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back'; 

import axios from 'axios';

const SalaryCalculator = () => {
  const [annualSalary, setAnnualSalary] = useState('');
  const [monthlySalary, setMonthlySalary] = useState(null);
  const [weeklySalary, setWeeklySalary] = useState(null);
  const [dailySalary, setDailySalary] = useState(null);

  const calculateSalary = () => {
    const monthly = (parseFloat(annualSalary) / 12).toFixed(2);
    const weekly = (parseFloat(annualSalary) / 52).toFixed(2);
    const daily = (parseFloat(annualSalary) / 260).toFixed(2); // Assuming 5 working days per week

    setMonthlySalary(monthly);
    setWeeklySalary(weekly);
    setDailySalary(daily);
  };

  const clearFields = () => {
    setAnnualSalary('');
    setMonthlySalary(null);
    setWeeklySalary(null);
    setDailySalary(null);
  };

  const calcTitle = "Salary Calculator"
  const inputData= {annualSalary:annualSalary,monthlySalary:monthlySalary,weeklySalary: weeklySalary}
  const resultData = dailySalary
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Salary Calculator</h2>
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Annual Salary:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              placeholder="Enter annual salary"
            />
          </div>
          <div className="flex w-full justify-between items-center mt-4">
            <button
              type="button"
              onClick={calculateSalary}
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
          {monthlySalary && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Monthly Salary: ${monthlySalary}</h3>
              <h3 className="text-xl font-bold">Weekly Salary: ${weeklySalary}</h3>
              <h3 className="text-xl font-bold">Daily Salary: ${dailySalary}</h3>
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

export default SalaryCalculator;
