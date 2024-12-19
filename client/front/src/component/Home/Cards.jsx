import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Cards = () => {
    const cardsInfo = [
        {
            id: 1,
            image: "https://static.vecteezy.com/system/resources/previews/013/126/369/non_2x/cartoon-maths-elements-background-education-logo-vector.jpg",
            title: "Maths & Algebra Calculators",
            route: "Maths"
        },
        {
            id: 2,
            image: "https://media.getmyuni.com/assets/images/articles/l1y2mo-c-2olf1tfrorn1eg60s-a8isr-haor0mu6tt2s3.jpg",
            title: "Geometry & Trigonometry Calculators",
            route: "GeoMatery"
        },
        {
            id: 3,
            image: "https://cdn.britannica.com/76/194476-131-85FEB7A3/Blackboard-formulas-calculations-mathematics-physics.jpg?w=840&h=460&c=crop",
            title: "Scientific Calculators",
            route: "scientific"
        },
        {
            id: 4,
            image: "https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_1280.jpg",
            title: "Financial Calculators",
            route: "Financial"
        },
        {
            id: 5,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoh6H-mcUU2_FCjAkNL3R-6LV2t4cwzl-n1g&s",
            title: "Conversion Calculators",
            route: "conversion"
        },
        {
            id: 6,
            image: "https://i.pinimg.com/originals/a1/18/39/a1183979090eb2210eaaf0502de43138.jpg",
            title: "Health & Fitness Calculators",
            route: "Health"
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCards = cardsInfo.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <form className='flex flex-col items-center mt-8 w-full px-4 lg:px-0'>
                <div className='w-full lg:w-96'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder='Search calculators...'
                        className='px-4 py-2 w-full border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300'
                    />
                </div>
                <button
                    type='submit'
                    className='mt-4 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-xl text-white font-semibold rounded-lg '
                    disabled
                >
                    Search
                </button>
            </form>
            <div className='flex flex-col justify-center items-center gap-8'>
                <div className='relative h-full w-full flex flex-col justify-center items-center gap-8 mt-6 lg:h-auto lg:w-auto lg:grid-cols-3 lg:grid lg:justify-between lg:items-center lg:mx-auto lg:gap-24 lg:py-8 md:grid md:grid-cols-2 md:gap-20 md:justify-center md:items-center md:w-auto md:px-3 md:py-4'>
                    {filteredCards.length > 0 ? (
                        filteredCards.map((items, index) => (
                            <div
                                key={items.id}
                                className={`flex flex-col gap-4 justify-between items-center h-[450px] w-80 border border-gray-300 rounded-lg p-4 shadow-lg shadow-gray-700
                                ${index === cardsInfo.length - 1 ? 'mb-8' : 'mb-0'} 
                                hover:shadow-2xl hover:transform hover:scale-105 transition-transform duration-300`}
                            >
                                <img src={items.image} alt={items.title} className='object-cover rounded-lg h-2/3 w-full' />
                                <h1 className='text-black font-semibold text-3xl text-center'>{items.title}</h1>
                                <Link to={`/${items.route}`} className='border border-red-500 px-4 py-3 bg-blue-500 font-semibold text-white rounded-md lg:py-2 lg:rounded-sm hover:bg-blue-600'>
                                    Explore More
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className='text-2xl text-gray-600'>No calculators found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cards;
