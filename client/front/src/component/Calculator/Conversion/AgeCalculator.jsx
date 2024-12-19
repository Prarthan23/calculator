/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../../Calculator/Button/Back';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted



  const calculateAge = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    const birth = new Date(birthDate);
    const today = new Date();
    const ageDiff = today.getFullYear() - birth.getFullYear();
    setAge(ageDiff);
  };

  const clearFields = () => {
    setBirthDate('');
    setAge(null);
    setSubmitted(false); // Reset submission status
  };

  const calcTitle = "Age Calculator"
  const inputData= birthDate
  const resultData = age
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Age Calculator</h2>
        <form onSubmit={calculateAge} className="flex flex-col gap-4 w-full">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="ring-1 ring-gray-500 p-1 w-full rounded-md"
          />
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate Age
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {age !== null && (
            <div className="lg:flex mt-4">
              <h3 className="text-2xl">Your Age:</h3>
              <p className="lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md">
                {age} years
              </p>
            </div>
          )}
        </form>
        {age !== null && (
          <div className="flex justify-center mt-4">
            <button
              onClick={submitData}
              className="bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
