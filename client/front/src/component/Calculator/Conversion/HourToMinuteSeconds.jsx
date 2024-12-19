/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import BackButton from '../../Calculator/Button/Back';

const HourToMinuteSeconds = () => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
   
   

  const convertTime = (e) => {
    e.preventDefault();
    const totalMinutes = hours * 60;
    const totalSeconds = totalMinutes * 60;
    setMinutes(totalMinutes);
    setSeconds(totalSeconds);
    setIsCalculated(true); // Mark that calculation is done
  };

  const clearFields = () => {
    setHours('');
    setMinutes('');
    setSeconds('');
    setIsCalculated(false);
  };

 const calcTitle = "Hour to Minute Converter"
  const inputData= {hours:hours}
  const resultData = {minutes: minutes, seconds: seconds}
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Hour to Minute & Seconds Converter</h2>
        <form onSubmit={convertTime} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Hours:
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              placeholder="Enter hours"
            />
          </label>
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Convert
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {(minutes || seconds) && (
            <>
              <div className="lg:flex flex-col mt-4">
                <p className="text-xl">Minutes: {minutes} min</p>
                <p className="text-xl">Seconds: {seconds} sec</p>
              </div>
              {isCalculated && (
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

export default HourToMinuteSeconds;
