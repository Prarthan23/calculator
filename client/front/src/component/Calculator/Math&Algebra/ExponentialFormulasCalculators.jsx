/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const ExponentialFormulasCalculator = () => {
  const [formula, setFormula] = useState("growth"); // Default formula
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false); // State to track calculation status

  const calculateResult = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r <= 0 || t <= 0) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }

    let resultValue;

    switch (formula) {
      case "growth":
        resultValue = P * Math.exp(r * t);
        break;
      case "decay":
        resultValue = P * Math.exp(-r * t);
        break;
      case "compoundInterest":
        resultValue = P * Math.pow(1 + r, t);
        break;
      case "euler":
        resultValue = Math.cos(r * t) + Math.sin(r * t);
        break;
      default:
        resultValue = 0;
    }

    setResult(resultValue.toFixed(2));
    setCalculated(true); // Mark calculation as done
  };

  const clearFields = () => {
    setFormula("growth");
    setPrincipal("");
    setRate("");
    setTime("");
    setResult(null);
    setCalculated(false); // Reset calculation status
  };

  const calcTitle = "Exponent Calculator"
  const inputData = { formula: formula, principal: principal, rate: rate, time: time }
  const resultData = result
  const submitData = async () => {
    try {

      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results: resultData,
        inputs: inputData
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Exponential Formulas Calculator</h2>
        <select
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        >
          <option value="growth">Exponential Growth</option>
          <option value="decay">Exponential Decay</option>
          <option value="compoundInterest">Compound Interest</option>
          <option value="euler">Euler's Formula</option>
        </select>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter Principal/Initial Value"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter Rate (%)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter Time (years)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateResult} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {result !== null && (
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

export default ExponentialFormulasCalculator;
