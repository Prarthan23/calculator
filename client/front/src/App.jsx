/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Registration from "./component/Login/Registration";
import Login from "../src/component/Login/Login";
import Cards from "./component/Home/Cards";
import Footer from "./component/Navbar/Footer";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import UserProfile from "./component/Profile/userProfile";
import Result from "./component/Results/Result";

import GeoMatery from "./component/Calculator/GeoMatery&Trigno/GeoMatery";
import CircleCalculator from "./component/Calculator/GeoMatery&Trigno/CircleCalculator";
import ConeCalculator from "./component/Calculator/GeoMatery&Trigno/ConeCalculator";
import CubeCalculator from "./component/Calculator/GeoMatery&Trigno/CubeCalculator";
import CylinderCalculator from "./component/Calculator/GeoMatery&Trigno/CylinderCalculator";
import Distance2dCalculator from "./component/Calculator/GeoMatery&Trigno/Distance2dCalculator";
import Distance3dCalculator from "./component/Calculator/GeoMatery&Trigno/Distance3dCalculator";
import IsoscelesTriangleCalculator from './component/Calculator/GeoMatery&Trigno/IsoscelesTriangleCalculator'
import RightAngledTriangleCalculator from './component/Calculator/GeoMatery&Trigno/RightAngledTriangleCalculator'
import ScaleneTriangleCalculator from './component/Calculator/GeoMatery&Trigno/scaleneTriangleCalculator'
import RectangleCalculator from './component/Calculator/GeoMatery&Trigno/RectangleCalculator'
import SquareCalculator from './component/Calculator/GeoMatery&Trigno/SquareCalculator'
import SphereCalculator from './component/Calculator/GeoMatery&Trigno/SphereCalculator'


import Math from "./component/Calculator/Math&Algebra/Math"
import ComplexNumberCalculator from './component/Calculator/Math&Algebra/ComplexNumberCalculator'
import BooleanAlgebraSimplifier from './component/Calculator/Math&Algebra/BooleanAlgebraSimplifier'
import PartialFractionDecomposer from './component/Calculator/Math&Algebra/PartialFractionDecomposer'
import InequalityCalculator from './component/Calculator/Math&Algebra/InequalityCalculator'
import FlowRateCalculator from './component/Calculator/Math&Algebra/FlowRateCalculator'
import ImpulseCalculator from './component/Calculator/Math&Algebra/ImpulseCalculator'
import FactorizationCalculator from './component/Calculator/Math&Algebra/FactorizationCalculator'
import PercentageCalculator from './component/Calculator/Math&Algebra/PercentageCalculator'
import ExponentialFormulasCalculator from './component/Calculator/Math&Algebra/ExponentialFormulasCalculators'
import Cube1Calculator from './component/Calculator/Math&Algebra/Cube1Calculator'
import CubeRootCalculator from './component/Calculator/Math&Algebra/CubeRootCalculator'

import Financial from "./component/Calculator/Financial/Financial";
import CompoundInterestCalculator from './component/Calculator/Financial/CompoundInterestCalculator';
import CurrencyConverter from './component/Calculator/Financial/CurrencyConverter';
import InvestmentCalculator from './component/Calculator/Financial/InvestmentCalculator';
import RetirementCalculator from './component/Calculator/Financial/RetirementCalculator';
import SalaryCalculator from './component/Calculator/Financial/SalaryCalculator';
import SalesTaxCalculator from './component/Calculator/Financial/SalesTaxCalculator';
import SimpleInterestCalculator from './component/Calculator/Financial/SimpleInterestCalculator';

import Conversion from './component/Calculator/Conversion/conversion'
import LengthConverter from './component/Calculator/Conversion/LengthConverter'
import AgeCalculator from './component/Calculator/Conversion/AgeCalculator'
import HourToMinuteSeconds from './component/Calculator/Conversion/HourToMinuteSeconds'
import DateCalculator from './component/Calculator/Conversion/DateCalculator'
import GPACalculator from './component/Calculator/Conversion/GPA_Calculator'
import HeightConverter from './component/Calculator/Conversion/HeightConverter'
import PasswordGenerator from './component/Calculator/Conversion/PasswordGenerator'
import BillTipCalculator from './component/Calculator/Conversion/BillTipCalculator'

import Scientific from "./component/Calculator/Scientific/Scientific";
import Health from './component/Calculator/Health&Fitness/Health'
import BMICalculator from './component/Calculator/Health&Fitness/BMICalculator'
import BMRCalculator from './component/Calculator/Health&Fitness/BMRCalculator'
import BodyFatCalculator from './component/Calculator/Health&Fitness/BodyFatCalculator'
import CalorieCalculator from './component/Calculator/Health&Fitness/CalorieCalculator'
import IdealWeightCalculator from './component/Calculator/Health&Fitness/IdealWeightCalculator'

import BasicCalculator from './component/Calculator/Scientific/BasicCalculator'
import ExponentCalculator from './component/Calculator/Scientific/ExponentCalculator'
import LogarithmCalculator from './component/Calculator/Scientific/LogarithmCalculator'
import TrigonometryCalculator from './component/Calculator/Scientific/TrigonometryCalculator'


function App() {
  return (
    <Router>
      <AppContent />
    </Router> 
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbarAndFooter = location.pathname !== "/" && location.pathname !== "/registration";

  return (
    <>
      {showNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/results" element={<Result/>} />
       
        <Route path="/GeoMatery" element={<GeoMatery />} />
        <Route path="/ConeCalculator" element={<ConeCalculator />} />
        <Route path="/CubeCalculator" element={<CubeCalculator />} />
        <Route path="/CylinderCalculator" element={<CylinderCalculator />} />
        <Route path="/Distance3dCalculator" element={<Distance3dCalculator />} />
        <Route path="/Distance2dCalculator" element={<Distance2dCalculator />} />
        <Route path='/Isoscesles' element={<IsoscelesTriangleCalculator/>} />
        <Route path='/RightAngled' element={<RightAngledTriangleCalculator/>} />
        <Route path='/scalene' element={<ScaleneTriangleCalculator/>} />
        <Route path='/Rectangle' element={<RectangleCalculator/>} />        
        <Route path="/CircleCalculator" element={<CircleCalculator />} />
        <Route path='/square' element={<SquareCalculator/>} />
        <Route path='/sphere' element={<SphereCalculator/>} />


        <Route path="/Maths" element={<Math />} />
        <Route path='/complex' element={<ComplexNumberCalculator/>}/>
        <Route path='/boolean' element={<BooleanAlgebraSimplifier/>}/>
        <Route path='/inequality' element={<InequalityCalculator/>}/>
        <Route path='/flowrate' element={<FlowRateCalculator/>}/>
        <Route path="/partial" element={<PartialFractionDecomposer/>}/>
        <Route path='/impulse' element={<ImpulseCalculator/>}/>
        <Route path='/factorization' element={<FactorizationCalculator/>}/>
        <Route path='/percentage' element={<PercentageCalculator/>}/>
        <Route path='/exponential' element={<ExponentialFormulasCalculator/>}/>
        <Route path='/cube' element={<Cube1Calculator/>}/>
        <Route path='/cuberoot' element={<CubeRootCalculator/>}/>

        <Route path="/conversion" element={<Conversion />} />
        <Route path="/length" element={<LengthConverter />} />
        <Route path="/age" element={<AgeCalculator />} />
        <Route path="/hour" element={<HourToMinuteSeconds />} />
        <Route path="/date" element={<DateCalculator />} />
        <Route path="/gpa" element={<GPACalculator />} />
        <Route path="/height" element={<HeightConverter />} />
        <Route path="/password" element={<PasswordGenerator />} />
        <Route path="/bill" element={<BillTipCalculator />} />       
        
        <Route path="/Health" element={<Health/>}/>
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/bmr" element={<BMRCalculator />} />
        <Route path="/BodyFat" element={<BodyFatCalculator />} />
        <Route path="/calorie" element={<CalorieCalculator />} />
        <Route path="/Ideal" element={<IdealWeightCalculator />} /> 
         
        <Route path="/scientific" element={<Scientific/>} />
        <Route path="/basic" element={< BasicCalculator/>} />       
        <Route path="/exponent" element={< ExponentCalculator />} />       
        <Route path="/log" element={<LogarithmCalculator />} />       
        <Route path="/trigo" element={<TrigonometryCalculator />} />  

        <Route path='/Financial' element={<Financial />} />   
        <Route path="/simple" element={<SimpleInterestCalculator />} />
        <Route path="/compound" element={<CompoundInterestCalculator />} />
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="/salary" element={<SalaryCalculator />} />
        <Route path="/retirement" element={<RetirementCalculator />} />
        <Route path="/sales" element={<SalesTaxCalculator />} />
        <Route path="/investment" element={<InvestmentCalculator />} />
       
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
