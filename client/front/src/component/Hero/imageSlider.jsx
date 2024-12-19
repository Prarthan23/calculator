import { useState, useEffect, useCallback } from 'react';
import './imageStyle.css';
import calc1 from '../../assets/1.png';
import calc2 from '../../assets/2.png';
import calc3 from '../../assets/3.png';
import calc4 from '../../assets/4.png';
import calc5 from '../../assets/5.png';

const slides = [
    {
        url:calc1
    },
    {
        url:calc2
    },
    {
        url:calc3
    },
    {
        url:calc4
    },
    {
        url:calc5
    }
];

export const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 2000);
        return () => clearInterval(intervalId);
    }, [nextSlide]);

    return (
        <div className='h-[350px] w-1/2 m-4 px-4 relative group mt-5 md:h-[550px]'>
            <div
             key={currentIndex}
                style={{
                    backgroundImage: `url(${slides[currentIndex].url})`,
                }}
                className='w-full h-full rounded-2xl bg-center bg-cover m-2 transition-opacity duration-1000 opacity-100 fade-in'
            ></div>
        </div>
    );
};