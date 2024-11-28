import React, { useState, useEffect } from "react";
import { quotesData } from "../../../data/data.js";

const MotivationSection = () => {
    const [currentQuote, setCurrentQuote] = useState(quotesData[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * quotesData.length);
            setCurrentQuote(quotesData[randomIndex]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500 text-white rounded-xl shadow-xl mx-6 my-8">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-100 tracking-wide">Sözlerle Yenilen</h2>
                    <p className="text-lg italic font-medium text-gray-50 mb-4">
                        {`"${currentQuote.text}"`}
                    </p>
                    <p className="text-sm font-medium text-gray-300">- {currentQuote.author}</p>
                </div>
            </div>
        </section>
    );
};

export default MotivationSection;
