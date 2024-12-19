/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../../Calculator/Button/Back';

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

   // Title for the calculation

  const generatePassword = (e) => {
    e.preventDefault();
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setIsGenerated(true); // Mark that password generation is done
  };

  const clearFields = () => {
    setLength(8);
    setPassword('');
    setIsGenerated(false);
    setSubmitted(false); // Reset submission status
  };

  const calcTitle = "Password Generator";
  const inputData= {length:length}
  const resultData = {password:password}
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Password Generator</h2>
        <form onSubmit={generatePassword} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Password Length:
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              min="1"
            />
          </label>
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Generate Password
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {password && (
            <>
              <p className="mt-4 text-xl break-words">Generated Password: {password}</p>
              {isGenerated && !submitted && (
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

export default PasswordGenerator;
