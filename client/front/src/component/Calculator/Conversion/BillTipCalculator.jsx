/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import BackButton from '../../Calculator/Button/Back';

const BillTipCalculator = () => {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState('');
  const [total, setTotal] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

   // Title for the calculation

  const calculateTotal = (e) => {
    e.preventDefault();
    const tipAmount = (bill * (tip / 100));
    const totalAmount = parseFloat(bill) + tipAmount;
    setTotal(totalAmount.toFixed(2));
    setIsCalculated(true); // Mark that calculation is done
  };

  const clearFields = () => {
    setBill('');
    setTip('');
    setTotal('');
    setIsCalculated(false);
  };

  const calcTitle = "Bill & Tip Calculator";
  const inputData= {bill: bill, tip: tip}
  const resultData = total
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Bill & Tip Calculator</h2>
        <form onSubmit={calculateTotal} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col">
            Bill Amount:
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              placeholder="e.g., 50"
            />
          </label>
          <label className="flex flex-col">
            Tip Percentage:
            <input
              type="number"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              placeholder="e.g., 15"
            />
          </label>
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate Total
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {total && (
            <>
              <div className="lg:flex mt-4">
                <h3 className="text-2xl">Total Amount:</h3>
                <p className="lg:ml-2 bg-white px-12 py-1 border border-green-500 rounded-md">
                  ${total}
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

export default BillTipCalculator;
