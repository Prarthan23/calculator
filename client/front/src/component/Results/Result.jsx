/* eslint-disable no-unused-vars */
// Result.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Result = () => {
  const [results, setResults] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/results`, {
          withCredentials: true, // Include credentials to allow cookies
        });

        if (response.data && Array.isArray(response.data.results)) {
          setResults(response.data.results);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const deleteResult = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/results/${id}`, {
        withCredentials: true, // Include credentials if necessary
      });

      // Remove the result from the frontend state
      setResults(results.filter(result => result._id !== id));
    } catch (err) {
      console.error('Error deleting result:', err);
      alert('Error deleting result');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading results!</div>;

  return (
    <div className='w-full min-h-screen flex flex-col gap-10 items-center overflow-y-auto'>
      <h2 className='text-5xl font-jersey uppercase font-bold tracking-wider lg:text-7xl mt-4 text-cyan-800'>Saved Results</h2>
      {results.length === 0 ? (
        <div className=' w-1/2 lg:w-full text-3xl lg:text-5xl flex justify-center  text-red-500 font-bold font-jersey tracking-widest mt-8'>You didn't save any results yet.</div>
      ) : (
        <ul className='flex flex-col m-3 p-4 gap-8 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2'>
          {results.map((result) => (
            <li key={result._id} className='flex flex-col w-[370px] lg:w-[400px] bg-slate-100 border-[1px] border-black px-6 lg:px-8 py-2 rounded-md shadow-md'>
              <p className='font-semibold text-2xl lg:tracking-tight text-blue-600'>{result.calcTitle}</p>
              <p className='text-xl mt-2 overflow-x-auto  font-semibold'>inputs:<span className='text-xl font-semibold text-cyan-600'> {JSON.stringify(result.inputs)}</span></p>
              <p className='text-xl mt-2 overflow-x-auto  font-semibold'>Results:<span className='text-xl font-semibold text-cyan-700'> {JSON.stringify(result.results)}</span></p>
              <button
                onClick={() => deleteResult(result._id)}
                className='lg:mt-4 mt-2 bg-red-500 uppercase text-white font-semibold w-1/3 px-2 py-1 rounded-md hover:bg-red-600'
              >
                Delete
              </button>
        
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Result;
