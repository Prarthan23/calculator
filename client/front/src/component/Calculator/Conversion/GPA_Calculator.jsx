import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import BackButton from '../../Calculator/Button/Back';

const GPACalculator = () => {
  const [grades, setGrades] = useState('');
  const [gpa, setGpa] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);


  const calculateGPA = (e) => {
    e.preventDefault();
    const gradeArray = grades.split(',').map(Number);
    const total = gradeArray.reduce((a, b) => a + b, 0);
    const average = total / gradeArray.length;
    setGpa(average.toFixed(2));
    setIsCalculated(true); // Mark that calculation is done
  };

  const clearFields = () => {
    setGrades('');
    setGpa('');
    setIsCalculated(false);
  };

  const calcTitle = "GPA Calculator";
  const inputData= grades
  const resultData = gpa
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">GPA Calculator</h2>
        <form onSubmit={calculateGPA} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Enter Grades (comma separated):
            <input
              type="text"
              value={grades}
              onChange={(e) => setGrades(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              placeholder="e.g., 3.5,4.0,2.8"
            />
          </label>
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate GPA
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {gpa && (
            <>
              <div className="lg:flex mt-4">
                <h3 className="text-2xl">GPA:</h3>
                <p className="lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md">
                  {gpa}
                </p>
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

export default GPACalculator;
