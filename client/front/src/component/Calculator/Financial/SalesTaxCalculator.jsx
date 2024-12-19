/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back';
import axios from 'axios';


const SalesTaxCalculator = () => {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);

  const calculateSalesTax = () => {
    const priceValue = parseFloat(price);
    const taxRateValue = parseFloat(taxRate) / 100;
    const total = priceValue + (priceValue * taxRateValue);
    setTotalPrice(total.toFixed(2));
  };

  const clearFields = () => {
    setPrice('');
    setTaxRate('');
    setTotalPrice(null);
  };

  const calcTitle = "Sales Tax Calculator"
  const inputData= {price: parseFloat(price), taxRate: parseFloat(taxRate)}
  const resultData = totalPrice
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
      <BackButton className="absolute top-4 left-4 md:top-6 md:left-6" />
      <div className="flex mt-4 flex-col h-auto w-80 border border-gray-800 justify-between items-start p-3 bg-gray-100 shadow-lg shadow-gray-400 rounded-lg gap-5 lg:w-[450px]">
        <h2 className="text-2xl text-center font-semibold tracking-tight">Sales & Tax Calculator</h2>
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tax Rate (%):</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="Enter tax rate"
            />
          </div>
          <div className="flex w-full justify-between items-center mt-4">
            <button
              type="button"
              onClick={calculateSalesTax}
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={clearFields}
              className="bg-blue-400 text-xl uppercase py-1 px-6 text-white rounded-md"
            >
              Clear
            </button>
          </div>
          {totalPrice !== null && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Total Price: ${totalPrice}</h3>
              <button
                onClick={submitData}
                className="bg-green-600 text-xl uppercase py-2 px-8 text-white rounded-md mt-4"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesTaxCalculator;
