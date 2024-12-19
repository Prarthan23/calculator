/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../Button/Back';
import axios  from 'axios';

const ImpulseCalculator = () => {
  const [force, setForce] = useState("");
  const [time, setTime] = useState("");
  const [impulse, setImpulse] = useState(null);

  const calculateImpulse = () => {
    if (force === "" || time === "") {
      alert("Please enter both force and time.");
      return;
    }

    const f = parseFloat(force);
    const t = parseFloat(time);

    if (isNaN(f) || isNaN(t) || f <= 0 || t <= 0) {
      alert("Please enter valid positive numbers for force and time.");
      return;
    }

    // Calculate the impulse using the formula: Impulse = Force * Time
    const impulseValue = f * t;
    setImpulse(impulseValue.toFixed(2)); // Set the impulse to two decimal places
  };

  const clearFields = () => {
    setForce("");
    setTime("");
    setImpulse(null);
  };

  const calcTitle = "Impulse Calculator"
  const inputData= {force:force, time:time}
  const resultData = impulse
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
    <div className='relative h-full w-full flex justify-center items-start  lg:items-center'>
      <BackButton className='hidden md:block' />
      <div className='flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]'>
        <h2 className='text-2xl text-center font-semibold tracking-tight'>Impulse Calculator</h2>
        <input
          type="number"
          value={force}
          onChange={(e) => setForce(e.target.value)}
          placeholder="Enter Force (Newtons)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter Time (seconds)"
          className='ring-1 ring-gray-500 p-1 w-full rounded-md'
        />
        <div className='flex w-full justify-between items-center'>
          <button onClick={calculateImpulse} className='bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md'>
            Calculate
          </button>
          <button onClick={clearFields} className='bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md'>
            Clear
          </button>
        </div>
        {impulse !== null && (
          <div className='lg:flex flex-col'>
            <div className='flex items-center'>
              <h3 className='text-2xl'>Impulse:</h3>
              <p className='lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md'>{impulse} Ns</p>
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

export default ImpulseCalculator;
