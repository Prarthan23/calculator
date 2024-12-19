import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const links = [
    { id: 1, name: 'Age Calculator', route: './BMI', bgColor: 'bg-blue-500' },
    { id: 2, name: 'Length Converter', route: './BMR', bgColor: 'bg-blue-500' },
    { id: 3, name: 'Height Converter', route: './BodyFat', bgColor: 'bg-blue-500' },
    { id: 4, name: 'Hour to Minute & Seconds', route: './Calorie', bgColor: 'bg-blue-500' },
    { id: 5, name: 'GPA Calculator', route: './Ideal', bgColor: 'bg-blue-500' },
  ];

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-6xl font-jersey text-cyan-800   tracking-wider text-center lg:text-7xl lg:tracking-wide uppercase">CONVERSION CALCULATORS</h1>
      <div className="flex flex-col justify-between items-center p-4 gap-8 lg:grid lg:grid-cols-3 lg:gap-10 md:grid md:grid-cols-2 md:gap-8">
        {links.map((link) => (
          <Link key={link.id} to={link.route}>
            <button
              className={`${link.bgColor} w-80 py-6 border border-gray-600 shadow-md shadow-gray-700 rounded-md text-white font-bold text-xl transition-transform duration-300 transform hover:scale-105`}
            >
              {link.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
