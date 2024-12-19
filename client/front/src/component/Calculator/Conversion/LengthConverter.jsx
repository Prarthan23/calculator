/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import BackButton from '../../Calculator/Button/Back';

const LengthConverter = () => {
  const [length, setLength] = useState('');
  const [convertedLength, setConvertedLength] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

   // Title for the calculation

  const convertLength = (e) => {
    e.preventDefault();
    setConvertedLength((length * 0.393701).toFixed(2)); // Conversion (meters to inches)
    setIsCalculated(true); // Mark that conversion is done
  };

  const clearFields = () => {
    setLength('');
    setConvertedLength(null);
    setIsCalculated(false);
    setSubmitted(false); // Reset submission status
  };

  const calcTitle = 'Length Converter';
  const inputData= {length:length}
  const resultData = {convertedLength:convertedLength}
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Length Converter</h2>
        <form onSubmit={convertLength} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Enter Length (in meters):
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              placeholder="Enter length in meters"
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
          {convertedLength !== null && (
            <>
              <p className="mt-4 text-xl">Converted length is {convertedLength} inches.</p>
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

export default LengthConverter;
