/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ImageSlider } from './imageSlider'

const Hero = () => {

  return (
    <div className='relative h-auto w-full flex flex-col items-center lg:h-auto lg:w-full lg:mt-0 lg:flex md:h-auto md:w-full md:flex md:mt-6 overflow-x-hidden'>
      <div className='relative h-auto w-full flex flex-col justify-between items-center mt-6 lg:flex-row lg:justify-between lg:items-center lg:px-4'>
       
        {/* Website title and subtitle */}
        <div className='flex flex-col items-center gap-8 px-4 lg:items-start'>
          <h1 className='text-6xl text-blue-700 font-bold  tracking-tight text-center lg:text-7xl lg:ml-2 lg:text-start font-plex'>All in one Calculator</h1>
          <h3 className='text-2xl text-blue-900 text-left lg:ml-2'>Explore a wide range of calculators & use according to your requirements.</h3>
          <a href="#_" class="relative inline-flex items-center justify-center px-3.5 py-2 m-1 overflow-hidden font-medium border-2 border-indigo-600 text-indigo-600 rounded-md group cursor-pointer">

    <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-indigo-600 rounded-full group-hover:w-56 group-hover:h-56"></span>


    <span class="relative text-indigo-600 transition-colors duration-300 group-hover:text-white ease">Get Started</span>
</a>


        </div>

        <ImageSlider/>
      </div>
    </div>
  )
}

export default Hero