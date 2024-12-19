/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../Button/Back';

const ComplexNumberCalculator = () => {
  const [real1, setReal1] = useState("");
  const [imag1, setImag1] = useState("");
  const [real2, setReal2] = useState("");
  const [imag2, setImag2] = useState("");
  const [result, setResult] = useState({ real: 0, imag: 0 });
  const [calculated, setCalculated] = useState(false);

  const addComplexNumbers = () => {
    if (real1 === "" || imag1 === "" || real2 === "" || imag2 === "") {
      alert("Please fill in all fields before performing the calculation.");
      return;
    }
    const real = Number(real1) + Number(real2);
    const imag = Number(imag1) + Number(imag2);
    setResult({ real, imag });
    setCalculated(true);
  };

  const clearFields = () => {
    setReal1("");
    setImag1("");
    setReal2("");
    setImag2("");
    setResult({ real: 0, imag: 0 });
    setCalculated(false);
  };

  const submitResults = async () => {
    const resultsData = { real: result.real, imag: result.imag };
    const inputData = { real1: Number(real1), imag1: Number(imag1), real2: Number(real2), imag2: Number(imag2) };
    const calcTitle = "Complex Number Calculator";
  
    console.log("Submitting Results:", { calcTitle, results: resultsData, inputs: inputData });
  
    try {
      const response = await axios.post(
        `http://localhost:3000/api/results`,
        {
          calcTitle,
          results: resultsData,
          inputs: inputData
        },
        {
          withCredentials: true
        }
      );
  
      if (response.status === 201) {
        alert('Results saved successfully!');
        clearFields();
      } else {
        alert(`Error saving results: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('An error occurred while saving the results.');
    }
  };

  return (
    <div className='h-full w-full flex justify-center items-start lg:items-center relative'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Complex Number Calculator</h2>
        <input
          type="number"
          value={real1}
          onChange={(e) => setReal1(e.target.value)}
          placeholder="Enter First Real Number"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={imag1}
          onChange={(e) => setImag1(e.target.value)}
          placeholder="Enter First Imaginary Number"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={real2}
          onChange={(e) => setReal2(e.target.value)}
          placeholder="Enter Second Real Number"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={imag2}
          onChange={(e) => setImag2(e.target.value)}
          placeholder="Enter Second Imaginary Number"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={addComplexNumbers} className='bg-red-700 text-xl uppercase py-1 px-6 text-white rounded-md'>
            CALCULATE
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {calculated && (
          <div>
            <h3 className='text-2xl'>Result:<span className='ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{result.real} + {result.imag}i</span></h3>
            <button onClick={submitResults} className='mt-4 bg-green-500 text-xl uppercase py-1 px-6 text-white rounded-md'>
              SUBMIT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplexNumberCalculator;
