/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../../Calculator/Button/Back';

const HeightConverter = () => {
  const [heightFtIn, setHeightFtIn] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

   // Title for the calculation

  const convertHeight = (e) => {
    e.preventDefault();
    const [ft, inInches] = heightFtIn.split(' ').map(Number);
    const totalInches = (ft * 12) + inInches;
    const cm = totalInches * 2.54;
    setHeightCm(cm.toFixed(2));
    setIsCalculated(true); // Mark that calculation is done
  };

  const clearFields = () => {
    setHeightFtIn('');
    setHeightCm('');
    setIsCalculated(false);
    setSubmitted(false); // Reset submission status
  };

  const calcTitle = "Height Converter";
  const inputData= heightFtIn
  const resultData = parseFloat(heightCm)
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Height Converter</h2>
        <form onSubmit={convertHeight} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Height (ft in):
            <input
              type="text"
              value={heightFtIn}
              onChange={(e) => setHeightFtIn(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              placeholder="e.g., 5 8"
            />
          </label>
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Convert
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {heightCm && (
            <>
              <div className="lg:flex mt-4">
                <h3 className="text-2xl">Height in cm:</h3>
                <p className="lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md">
                  {heightCm} cm
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

export default HeightConverter;
