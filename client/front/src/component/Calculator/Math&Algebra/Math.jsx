
// eslint-disable-next-line no-unused-vars
import React from 'react'
import BackButton from '../Button/Back';

const Math = () => {

const links = [
  {
    id:1,
    name:"ComplexNumberCalculator",
    route:"./complex"
  },
  {
    id:2,
    name:"BooleanAlgebraSimplifier",
    route:"./boolean"
  },
  {
    id:3,
    name:"PartialFractionDecomposer",
    route:"./partial"
  },
  {
    id:4,
    name:"InequalityCalculator",
    route:"./inequality"
  },
  {
    id:5,
    name:"FlowRateCalculator",
    route:"./flowrate"
  },
  {
    id:6,
    name:"ImpulseCalculator",
    route:"./impulse"
  },
  {
    id:7,
    name:"FactorizationCalculator",
    route:"./factorization"
  },
  {
    id:8,
    name:"PercentageCalculator",
    route:"./percentage"
  },
  {
    id:9,
    name:"ExponentialFormulasCalculator",
    route:"./exponential"
  },
  {
    id:10,
    name:"CubeCalculator",
    route:"./cube"
  },
  {
    id:11,
    name:"CubeRoot Calculator",
    route:"./cuberoot"
  }
];
  return (
    <div className='h-full w-full'>
      
      <div className='flex flex-col items-center gap-4 p-6 lg:gap-8 relative'>
      <BackButton className="absolute top-4 left-4 md:top-6 md:left-6" />
        <h1 className=' text-6xl font-jersey text-cyan-800   tracking-wider text-center lg:text-7xl uppercase'>Maths & Algebra Calculators</h1>
        <div className='flex flex-col justify-between items-center p-4 gap-8 lg:grid lg:grid-cols-3 lg:gap-10 md:grid md:grid-cols-2 md:gap-8'>
          {
            links.map((items)=>
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

export default Math
{/* <div className='flex flex-col justify-center items-center p-4 w-full'>
      <div className='flex flex-col gap-10 lg:gap-16'>
      <ComplexNumberCalculator/>
      <BooleanAlgebraSimplifier/>
      <PartialFractionDecomposer/>
      <InequalityCalculator/>
      <FlowRateCalculator/>
      <ImpulseCalculator/>
      <FactorizationCalculator/>
      <PercentageCalculator/>
      <ExponentialFormulasCalculator/>
      <CubeCalculator/>
      <CubeRootCalculator/>
      </div>
    </div> */}