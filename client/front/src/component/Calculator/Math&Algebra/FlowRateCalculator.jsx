/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios from 'axios';

const FlowRateCalculator = () => {
  const [diameter, setDiameter] = useState("");
  const [velocity, setVelocity] = useState("");
  const [flowRate, setFlowRate] = useState(null);
  const [calculated, setCalculated] = useState(false); // State to track if calculation is done

  const calculateFlowRate = () => {
    if (diameter === "" || velocity === "") {
      alert("Please enter both diameter and velocity.");
      return;
    }

    const d = parseFloat(diameter);
    const v = parseFloat(velocity);

    if (isNaN(d) || isNaN(v) || d <= 0 || v <= 0) {
      alert("Please enter valid positive numbers for diameter and velocity.");
      return;
    }

    // Calculate the flow rate using the formula: Q = v * (π * d² / 4)
    const flowRateValue = v * (Math.PI * Math.pow(d, 2) / 4);
    setFlowRate(flowRateValue.toFixed(2)); // Set the flow rate to two decimal places
    setCalculated(true); // Set calculated to true after calculation
  };

  const clearFields = () => {
    setDiameter("");
    setVelocity("");
    setFlowRate(null);
    setCalculated(false); // Reset calculated state
  };

  const calcTitle = "FlowRate Calculator"
  const inputData= {diameter:diameter, velocity:velocity}
  const resultData = flowRate
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
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Flow Rate Calculator</h2>
        <input
          type="number"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          placeholder="Enter Pipe Diameter (meters)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={velocity}
          onChange={(e) => setVelocity(e.target.value)}
          placeholder="Enter Velocity (m/s)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateFlowRate} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {flowRate !== null && (
          <div className='lg:flex flex-col items-start mt-4'>
            <h3 className='text-2xl'>Flow Rate:</h3>
            <p className='bg-white px-4 py-2 border border-green-500 rounded-md text-lg'>
              {flowRate} m³/s
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

export default FlowRateCalculator;
