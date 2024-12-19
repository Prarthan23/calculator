  // eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { parse, simplify, format } from 'mathjs';
import BackButton from '../Button/Back';
import axios from 'axios';

const PartialFractionDecomposer = () => {
  const [numerator, setNumerator] = useState("");
  const [denominator, setDenominator] = useState("");
  const [result, setResult] = useState("");

  const decomposeFraction = () => {
    try {
      // Validate the input
      if (!numerator || !denominator) {
        alert("Please enter both numerator and denominator.");
        return;
      }

      // Parse and simplify the expression
      const expression = parse(`${numerator}/(${denominator})`);
      const simplifiedExpression = simplify(expression);

      // Format and display the result
      setResult(format(simplifiedExpression));
    } catch {
      alert("Invalid input. Please enter valid mathematical expressions.");
    }
  };

  const clearFields = () => {
    setNumerator("");
    setDenominator("");
    setResult("");
  };

  const calcTitle = "Partial Fraction Calculator"
  const inputData= {numerator:numerator,denominator:denominator}
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
    <div className='h-full w-full flex justify-center items-start lg:items-center relative'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Partial Fraction Decomposer</h2>
        <input
          type="text"
          value={numerator}
          onChange={(e) => setNumerator(e.target.value)}
          placeholder="Enter Numerator (e.g., x^2 + 3x + 2)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="text"
          value={denominator}
          onChange={(e) => setDenominator(e.target.value)}
          placeholder="Enter Denominator (e.g., x^2 - 1)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={decomposeFraction} className='bg-red-700 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Decompose
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {result && (
          <div className='lg:flex flex-col'>
            <div className='flex items-center'>
              <h3 className='text-2xl'>Decomposed Expression:</h3>
              <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{result}</p>
            </div>
            <button onClick={submitData} className='mt-4 bg-green-600 text-xl uppercase py-1 px-8 text-white rounded-md'>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartialFractionDecomposer;
