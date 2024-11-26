import React, { useState, useEffect } from "react";
import sliderData from "./SliderData.js";

const Slider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const updateIndex = (newIndex) => {
        setCurrentIndex((newIndex + slides.length) % slides.length);
    };

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <img
                        key={slide.id}
                        src={slide.imageUrl}
                        alt={slide.altText}
                        className="w-full flex-none object-cover"
                    />
                ))}
            </div>

            <button
                onClick={() => updateIndex(currentIndex - 1)}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
                <span className="sr-only">Previous</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={() => updateIndex(currentIndex + 1)}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
                <span className="sr-only">Next</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

const InfoSection = () => (
    <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-blue-600">VZW JET</h2>
                <h3 className="text-xl font-semibold text-gray-600">Jeugd en Toekomst</h3>
                <p className="mt-4 text-gray-700">
                    VZW JET is a youth organization focused on the personal development of
                    young people through mentoring or buddy systems and various activities.
                </p>
                <a
                    href="#youtube-info"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    About Us
                </a>
            </div>
            <div className="w-full md:w-1/2">
                <Slider slides={sliderData} />
            </div>
        </div>
    </section>
);

export default InfoSection;
