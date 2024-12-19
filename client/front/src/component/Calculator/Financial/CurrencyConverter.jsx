/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import BackButton from '../../Calculator/Button/Back';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY'];

  const convertCurrency = () => {
    // Mock conversion rate for demonstration
    const conversionRate = 0.85; // Example: USD to EUR
    const result = amount * conversionRate *100;
    setConvertedAmount(result.toFixed(2));
  };

  const clearFields = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('EUR');
    setConvertedAmount(null);
  };

  const calcTitle = "Currency Convert Calculator"
  const inputData= {amount: amount, fromCurrency: fromCurrency, toCurrency: toCurrency}
  const resultData = convertedAmount
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
        <h2 className="text-2xl text-center font-semibold tracking-tight">Currency Converter</h2>
        <div className="flex flex-col gap-4 w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Amount:</label>
            <input
              type="number"
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">From:</label>
            <select
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">To:</label>
            <select
              className="ring-1 ring-gray-500 p-1 w-full rounded-md"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className="flex w-full justify-between items-center mt-4">
            <button
              className="bg-red-700 text-xl uppercase py-1 px-8 text-white rounded-md"
              onClick={convertCurrency}
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
          {convertedAmount && (
            <div className="mt-4">
              <h3 className="text-2xl">Converted Amount:</h3>
              <p className="bg-white px-12 py-1 border border-green-500 rounded-md">
                {convertedAmount} {toCurrency}
              </p>
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

export default CurrencyConverter;
