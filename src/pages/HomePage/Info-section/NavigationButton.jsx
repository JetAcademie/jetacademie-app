import React from "react";

const NavigationButton = ({ direction, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`absolute top-1/2 ${direction === "prev" ? "left-4" : "right-4"} 
                -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none`}
        >
            <span className="sr-only">{direction === "prev" ? "Previous" : "Next"}</span>
            <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
            </svg>
        </button>
    );
};

export default NavigationButton;
