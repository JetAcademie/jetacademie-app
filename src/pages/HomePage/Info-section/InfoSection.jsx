import React from "react";
import Slider from "./Slider";
import sliderData from "./SliderData.js";

const InfoSection = () => (
    <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 flex flex-wrap items-center">
            {/* Text Content */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">VZW JET</h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Jeugd en Toekomst</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                    VZW JET is a youth organization focused on the personal development of young people through mentoring or buddy systems and various activities.
                </p>
                <a
                    href="#mission-section"
                    className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    About Us
                </a>
            </div>

            {/* Slider */}
            <div className="w-full md:w-1/2">
                <Slider slides={sliderData} />
            </div>
        </div>
    </section>
);

export default InfoSection;
