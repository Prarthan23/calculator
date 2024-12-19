/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios'

const InequalityCalculator = () => {
  const [inequality, setInequality] = useState("");
  const [result, setResult] = useState("");
  const [calculated, setCalculated] = useState(false); // State to track if calculation is done

  const evaluateInequality = () => {
    try {
    
      if (!inequality.match(/[<>=!]/)) {
        alert("Please enter a valid inequality.");
        return;
      }

    
      const evaluatedResult = eval(inequality);

     
      setResult(evaluatedResult ? "True" : "False");
      setCalculated(true); 
    } catch (error) {
      alert("Invalid inequality. Please enter a valid mathematical inequality.");
    }
  };

  const clearFields = () => {
    setInequality("");
    setResult("");
    setCalculated(false); // Reset calculated state
  };

  const calcTitle = "Inequality Calculator"
  const inputData= inequality
  const resultData = result
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
    <div className='relative h-full w-full flex justify-center items-start lg:items-center'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Inequality Calculator</h2>
        <input
          type="text"
          value={inequality}
          onChange={(e) => setInequality(e.target.value)}
          placeholder="Enter inequality (e.g., 3x + 2 > 5)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={evaluateInequality} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Evaluate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {result && (
          <div className='lg:flex flex-col items-start mt-4'>
            <h3 className='text-2xl'>Result:</h3>
            <p className='bg-white px-4 py-2 border border-green-500 rounded-md text-lg'>
              {result}
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

export default InequalityCalculator;
