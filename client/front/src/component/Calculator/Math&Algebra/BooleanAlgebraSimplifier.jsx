/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import BackButton from '../Button/Back';

const BooleanAlgebraSimplifier = () => {
  const [expression, setExpression] = useState("");
  const [simplifiedExpression, setSimplifiedExpression] = useState("");
  const [calculated, setCalculated] = useState(false); // New state to track if calculation is done

  const simplifyExpression = () => {
    try {
      // Basic simplifications (this is a simple demonstration)
      let simplified = expression
        .replace(/\s+/g, '') // Remove spaces
        .replace(/!\(false\)/g, 'true') // NOT false is true
        .replace(/!\(true\)/g, 'false') // NOT true is false
        .replace(/true&&true/g, 'true') // true AND true is true
        .replace(/false&&true|true&&false|false&&false/g, 'false') // Any AND with false is false
        .replace(/true\|\|false|false\|\|true|true\|\|true/g, 'true') // Any OR with true is true
        .replace(/false\|\|false/g, 'false'); // false OR false is false

      setSimplifiedExpression(simplified);
      setCalculated(true); // Set calculated to true after calculation
    } catch {
      alert("Invalid Boolean expression. Please check your input.");
    }
  };
  const calcTitle = "Boolean Algebra Simplifier";

  const clearFields = () => {
    setExpression("");
    setSimplifiedExpression("");
    setCalculated(false); 
  };

  const submitData = async () => {
    try {
      
     
      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:simplifiedExpression,
        inputs:expression
      }, {
        withCredentials: true, 
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Boolean Algebra Simplifier</h2>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter Boolean Expression (e.g. A && !B || C)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={simplifyExpression} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            CALCULATE
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {simplifiedExpression && (
          <div className='lg:flex flex-col items-start mt-4'>
            <h3 className='text-xl font-semibold'>Simplified Expression:</h3>
            <p className='bg-white px-4 py-2 border border-green-500 rounded-md text-sm items-center'>
              {simplifiedExpression}
            </p>
            <button onClick={submitData} className='mt-4 bg-green-500 text-xl uppercase py-1 px-6 text-white rounded-md'>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooleanAlgebraSimplifier;
