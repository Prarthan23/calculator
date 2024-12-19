/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back';
import axios from 'axios'; // Adjust the path as necessary

const CombinedScientificCalculator = () => {
  const [basicCalc, setBasicCalc] = useState({ num1: '', num2: '', operator: '+', result: null });
  const [trigoCalc, setTrigoCalc] = useState({ angle: '', result: null });
  const [logCalc, setLogCalc] = useState({ number: '', base: '10', result: null });
  const [expCalc, setExpCalc] = useState({ base: '', exponent: '', result: null });

  // Basic Calculator Logic
  const calculateBasic = () => {
    let calcResult;
    const number1 = parseFloat(basicCalc.num1);
    const number2 = parseFloat(basicCalc.num2);

    switch (basicCalc.operator) {
      case '+':
        calcResult = number1 + number2;
        break;
      case '-':
        calcResult = number1 - number2;
        break;
      case '*':
        calcResult = number1 * number2;
        break;
      case '/':
        calcResult = number1 / number2;
        break;
      default:
        calcResult = 0;
    }
    setBasicCalc({ ...basicCalc, result: calcResult.toFixed(4) });
  };

  // Trigonometry Calculator Logic
  const calculateTrigonometry = () => {
    const rad = (trigoCalc.angle * Math.PI) / 180;
    setTrigoCalc({
      ...trigoCalc,
      result: {
        sin: Math.sin(rad).toFixed(4),
        cos: Math.cos(rad).toFixed(4),
        tan: Math.tan(rad).toFixed(4),
      },
    });
  };

  // Logarithm Calculator Logic
  const calculateLogarithm = () => {
    if (logCalc.number && logCalc.base && logCalc.base !== '1') {
      const logResult = Math.log(parseFloat(logCalc.number)) / Math.log(parseFloat(logCalc.base));
      setLogCalc({ ...logCalc, result: logResult.toFixed(4) });
    } else {
      alert('Please enter valid number and base (base should not be 1).');
    }
  };

  // Exponent Calculator Logic
  const calculateExponent = () => {
    const expResult = Math.pow(parseFloat(expCalc.base), parseFloat(expCalc.exponent));
    setExpCalc({ ...expCalc, result: expResult.toFixed(4) });
  };

  // Clear functions
  const clearFields = () => {
    setBasicCalc({ num1: '', num2: '', operator: '+', result: null });
    setTrigoCalc({ angle: '', result: null });
    setLogCalc({ number: '', base: '10', result: null });
    setExpCalc({ base: '', exponent: '', result: null });
  };
  const clearBasicCalc = () => setBasicCalc({ num1: '', num2: '', operator: '+', result: null });
  const clearTrigoCalc = () => setTrigoCalc({ angle: '', result: null });
  const clearLogCalc = () => setLogCalc({ number: '', base: '10', result: null });
  const clearExpCalc = () => setExpCalc({ base: '', exponent: '', result: null });

  // Handle submit
  const calcTitle = "Basic Calculator"
  const inputData= basicCalc.operator
  const resultData = {basicCalc:basicCalc, trigoCalc:trigoCalc, logCalc:logCalc, expCalc:expCalc}
  const submitData = async () => {
    try {

      await axios.post('http://localhost:3000/api/results', {
        calcTitle,
        results:resultData,
        inputs:inputData
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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md relative">
      <BackButton className='hidden md:block' />

      <h1 className="text-4xl font-bold text-center mb-8">Combined Scientific Calculator</h1>

      {/* Basic Calculator */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Calculator</h2>
        <input
          type="number"
          value={basicCalc.num1}
          onChange={(e) => setBasicCalc({ ...basicCalc, num1: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter first number"
        />
        <input
          type="number"
          value={basicCalc.num2}
          onChange={(e) => setBasicCalc({ ...basicCalc, num2: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter second number"
        />
        <select
          value={basicCalc.operator}
          onChange={(e) => setBasicCalc({ ...basicCalc, operator: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <div className="flex flex-wrap w-full justify-between items-center space-x-1 mb-4">
          <button
            onClick={calculateBasic}
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
          >
            Calculate
          </button>
          <button
            onClick={clearBasicCalc}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        {basicCalc.result !== null && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl">Result: {basicCalc.result}</p>
            <button
              onClick={submitData}
              className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Trigonometry Calculator */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Trigonometry Calculator</h2>
        <input
          type="number"
          value={trigoCalc.angle}
          onChange={(e) => setTrigoCalc({ ...trigoCalc, angle: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter angle in degrees"
        />
        <div className="flex flex-wrap w-full justify-between items-center space-x-1 mb-4">
          <button
            onClick={calculateTrigonometry}
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
          >
            Calculate
          </button>
          <button
            onClick={clearTrigoCalc}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        {trigoCalc.result && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl">Sin: {trigoCalc.result.sin}</p>
            <p className="text-xl">Cos: {trigoCalc.result.cos}</p>
            <p className="text-xl">Tan: {trigoCalc.result.tan}</p>
            <button
              onClick={submitData}
              className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Logarithm Calculator */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Logarithm Calculator</h2>
        <input
          type="number"
          value={logCalc.number}
          onChange={(e) => setLogCalc({ ...logCalc, number: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter number"
        />
        <input
          type="number"
          value={logCalc.base}
          onChange={(e) => setLogCalc({ ...logCalc, base: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter base"
        />
        <div className="flex flex-wrap w-full justify-between items-center space-x-1 mb-4">
          <button
            onClick={calculateLogarithm}
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
          >
            Calculate
          </button>
          <button
            onClick={clearLogCalc}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        {logCalc.result !== null && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl">Logarithm: {logCalc.result}</p>
            <button
              onClick={submitData}
              className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Exponent Calculator */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Exponent Calculator</h2>
        <input
          type="number"
          value={expCalc.base}
          onChange={(e) => setExpCalc({ ...expCalc, base: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter base"
        />
        <input
          type="number"
          value={expCalc.exponent}
          onChange={(e) => setExpCalc({ ...expCalc, exponent: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter exponent"
        />
        <div className="flex flex-wrap w-full justify-between items-center space-x-1 mb-4">
          <button
            onClick={calculateExponent}
            className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
          >
            Calculate
          </button>
          <button
            onClick={clearExpCalc}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        {expCalc.result !== null && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl">Result: {expCalc.result}</p>
            <button
              onClick={submitData}
              className="bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedScientificCalculator;
