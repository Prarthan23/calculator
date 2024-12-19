// eslint-disable-next-line no-unused-vars
import React from 'react'
import BackButton from '../Button/Back';
const GeoMatery = () => {
  const links = [
    {
      id: 1,
      name: "CircleCalculator",
      route: "./CircleCalculator"
    },
    {
      id: 2,
      name: "ConeCalculator",
      route: "./ConeCalculator"
    },
    {
      id: 3,
      name: "CubeCalculator",
      route: "./CubeCalculator"
    },
    {
      id: 4,
      name: "CylinderCalculator",
      route: "./CylinderCalculator"
    },
    {
      id: 5,
      name: "Distance2dCalculator",
      route: "./Distance2dCalculator"
    },
    {
      id: 6,
      name: "Distance3dCalculator",
      route: "./Distance3dCalculator"
    },
    {
      id: 7,
      name: "IsoscelesTriangle",
      route: "./Isoscesles"
    },
    {
      id: 8,
      name: "Rectangle",
      route: "./Rectangle"
    },
    {
      id: 9,
      name: "RightAngled",
      route: "./RightAngled"
    },
    {
      id: 10,
      name: "ScaleneTriangle",
      route: "./scalene"
    },
    {
      id: 11,
      name: "Sphere",
      route: "./sphere"
    },
    {
      id: 12,
      name: "Square",
      route: "./square"
    }
  ];
  return (
    <div className='h-full w-full '>
        
      <div className='flex flex-col items-center gap-4 p-6 lg:gap-8 relative'>
      <BackButton className="absolute top-4 left-4 md:top-6 md:left-6" />
        <h1 className=' text-6xl font-jersey text-cyan-800   tracking-wider text-center lg:text-7xl lg:tracking-wide uppercase'>GeoMatery & Trignometry Calculators</h1>
        <div className='flex flex-col justify-between items-center p-4 gap-8 lg:grid lg:grid-cols-3 lg:gap-10 md:grid md:grid-cols-2 md:gap-8'>
          {
            links.map((items) =>
            (
              <a key={items.id} href={`/${items.route}`} className='bg-cyan-500 w-80 py-6 border border-gray-600 shadow-md shadow-gray-700 rounded-md  lg:hover:scale-110 transition-transform duration-300 lg:hover:bg-blue-600 lg:py-8 lg:w-96 md:w-80 md:py-6'>
                <h1 className='text-xl text-center font-semibold lg:text-2xl text-white'>{items.name}</h1>
              </a>
            )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default GeoMatery;