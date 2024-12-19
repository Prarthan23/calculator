/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../../Calculator/Button/Back';

const DateCalculator = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [days, setDays] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

   // Title for the calculation

  const calculateDateDifference = (e) => {
    e.preventDefault();
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
    setIsCalculated(true); // Mark that calculation is done
  };

  const clearFields = () => {
    setDate1('');
    setDate2('');
    setDays('');
    setIsCalculated(false);
    setSubmitted(false); // Reset submission status
  };

  const calcTitle = "Date Difference Calculator";
  const inputData= {date1:date1, date2:date2}
  const resultData = days
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
      <BackButton className='hidden md:block' />
      <div className="flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]">
        <h2 className="text-2xl text-center font-semibold tracking-tight">Date Calculator</h2>
        <form onSubmit={calculateDateDifference} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Date 1 (YYYY-MM-DD):
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            />
          </label>
          <label className="flex flex-col">
            Date 2 (YYYY-MM-DD):
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
            />
          </label>
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate Difference
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {days && (
            <>
              <div className="lg:flex mt-4">
                <h3 className="text-2xl">Days Between:</h3>
                <p className="lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md">
                  {days} days
                </p>
              </div>
              {isCalculated && !submitted && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={submitData}
                    className="bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default DateCalculator;
