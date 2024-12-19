import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const calculators = [
    {
      name: 'Health & Fitness Calculator',
      description: 'The Health and Fitness Calculator is an all-in-one tool designed to help you monitor and improve your physical well-being. Whether you are tracking your body metrics, calculating your daily caloric needs, or assessing your overall fitness, this calculator provides a comprehensive suite of features.',
      link: '/Health&Fitness-calculator'
    },
    {
      name: 'Conversion Calculator',
      description: 'The Conversion Calculator is a versatile tool designed to simplify a wide range of everyday calculations. Whether you’re dealing with measurements, time, or even currency, this calculator provides quick and accurate conversions, making it an essential resource for students, professionals, and anyone who frequently works with different units. Here’s a breakdown of the various functionalities offered by the Conversion Calculator.',
      link: '/Conversion-calculator'
    },
    {
      name: 'Finencial Calculator',
      description: 'The Financial Calculator is a comprehensive tool designed to assist with various financial computations, whether you’re managing personal finances, planning investments, or calculating loans. This calculator serves as an invaluable resource for anyone who wants to make informed financial decisions by providing precise calculations for a wide range of financial scenarios. Below are the key functionalities offered by the Financial Calculator.',
      link: '/date-calculator'
    },
    {
      name: 'Geometry Calculator',
      description: 'The Geometry Calculator is an essential tool designed to assist students, teachers, and professionals with a wide range of geometric computations. Whether you’re solving basic problems or tackling complex geometric shapes, this calculator offers accurate and quick solutions, making it an indispensable resource for anyone dealing with geometry. Below are the key functionalities offered by the Geometry Calculator.',
      link: '/Geometry-calculator'
    },
    {
      name: 'Math & Algebra Calculator',
      description: 'The Math & Algebra Calculator is a powerful and versatile tool designed to assist students, teachers, and professionals in solving a wide range of mathematical and algebraic problems. From basic arithmetic to advanced algebraic equations, this calculator provides quick and accurate solutions, making it an essential resource for anyone working with mathematics. Below are the key functionalities offered by the Math & Algebra Calculator.',
      link: '/Math&Algebra-converter'
    },
    {
      name: 'Scientific Calculator',
      description: 'The Scientific Calculator is an advanced tool designed to handle complex mathematical functions that go beyond basic arithmetic. It is essential for students, engineers, scientists, and professionals who require precise calculations in fields such as physics, chemistry, engineering, and higher mathematics. With a wide range of functions, the Scientific Calculator is capable of solving everything from simple equations to intricate scientific computations.',
      link: '/Scientific'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg bg-yellow-500 text-gray-600">
            Welcome to our All-in-One Calculator website! We aim to provide you with a suite of calculators designed to simplify various aspects of your daily life. Below is a brief description of each calculator we offer.
          </p>
        </header>

        {/* Calculator Descriptions Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calculator, index) => (
            <div key={index} className="bg-green-100 hover:bg-orange-100 p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{calculator.name}</h2>
              <p className=" text-gray-600 mb-4">{calculator.description}</p>
              <Link
                to={calculator.link}
                className="text-cyan-500 hover:text-cyan-600 font-medium"
              >
                Learn More
              </Link>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="bg-blue-200 py-8 px-4 rounded-lg shadow-lg mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Contact Us</h2>
          <div className="max-w-lg mx-auto">
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border bg-red-300 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border bg-red-300 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 border bg-red-300 border-gray-300 rounded-lg"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
