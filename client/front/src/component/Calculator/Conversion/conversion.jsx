/* eslint-disable no-unused-vars */
// src/components/Conversion.jsx
import React from 'react';
import BackButton from '../../Calculator/Button/Back';

const Conversion = () => {
  const links = [
    { id: 1, 
      name: "AgeCalculator", 
      route: "age" 
    },

    { id: 2, 
      name: "BillTipCalculator",
      route: "bill" 
    },

    { id: 3, 
      name: "Date Calculator", 
      route: "date" 
    },

    { id: 4, 
      name: "GPA_Calculator", 
      route: "gpa" 
    },

    { id: 5, 
      name: "HeightConverter", 
      route: "height" 
    },

    { id: 6, 
      name: "HourToMinuteSeconds", 
      route: "hour" 
    },

    { id: 7, 
      name: "LengthConverter", 
      route: "length" 
    },

    { id: 8, 
      name: "PasswordGenerator", 
      route: "password" 
    },
  ];

  return (
    <div className='h-full w-full relative'>
          <BackButton className='hidden md:block' />
      <div className='flex flex-col items-center gap-4 p-6 lg:gap-8'>
        <h1 className='text-6xl font-jersey text-cyan-800   tracking-wider text-center lg:text-7xl lg:tracking-wide uppercase'>
          CONVERSION CALCULATORS
        </h1>
        <div className='flex flex-col justify-between items-center p-4 gap-8 lg:grid lg:grid-cols-3 lg:gap-10 md:grid md:grid-cols-2 md:gap-8'>
          {links.map((item) => (
            <a
              key={item.id}
              href={`/${item.route}`}
              className='bg-cyan-500 w-80 py-6 border border-gray-600 shadow-md shadow-gray-700 rounded-md lg:hover:scale-90 transition-transform duration-300 lg:hover:bg-[#2b7b8b] lg:py-8 lg:w-96 md:w-80 md:py-6'
            >
              <h1 className='text-xl text-center font-semibold lg:text-2xl text-white'>
                {item.name}
              </h1>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Conversion;
