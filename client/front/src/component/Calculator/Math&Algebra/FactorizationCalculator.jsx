/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const FactorizationCalculator = () => {
  const [number, setNumber] = useState("");
  const [factors, setFactors] = useState([]);
  const [calculated, setCalculated] = useState(false); // State to track if calculation is done

  const calculateFactors = () => {
    const num = parseInt(number, 10);

    if (isNaN(num) || num <= 1) {
      alert("Please enter a valid integer greater than 1.");
      return;
    }

    // Function to perform prime factorization
    const getPrimeFactors = (n) => {
      let factors = [];
      // Divide by 2 until n is odd
      while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
      }
      // Divide by odd numbers
      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
          factors.push(i);
          n = n / i;
        }
      }
      // If n is a prime number greater than 2
      if (n > 2) {
        factors.push(n);
      }
      return factors;
    };

    const primeFactors = getPrimeFactors(num);
    setFactors(primeFactors);
    setCalculated(true); // Set calculated to true after calculation
  };

  const clearFields = () => {
    setNumber("");
    setFactors([]);
    setCalculated(false); // Reset calculated state
  };

  const calcTitle = "Factorization Calculator"
  const inputData= number
  const resultData = factors
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
    <div className='h-full w-full flex justify-center items-start lg:items-center relative'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Factorization Calculator</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter an Integer"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateFactors} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {factors.length > 0 && (
          <div className='lg:flex flex-col items-start mt-4'>
            <h3 className='text-2xl'>Prime Factors:</h3>
            <p className='bg-white px-4 py-2 border border-green-500 rounded-md text-lg'>
              {factors.join(' x ')}
            </p>
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

export default FactorizationCalculator;
