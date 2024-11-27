import React from "react";
import { libraryCategories } from "../data/data";
import Card from "../components/Card";
import Navbar from "../pages/HomePage/Navbar/Navbar.jsx";
import Footer from "../pages/HomePage/footer/footer.jsx";

const DigitalLibrary = () => {
    return (
        <div>
            <Navbar />

            <div className="mt-[80px] text-center py-10 py-6 bg-[#002147] text-white rounded-lg shadow-lg">
                <h1 className="text-5xl font-extrabold mb-4">Digital Library</h1>
                <p className="text-xl font-medium max-w-2xl mx-auto">
                    Explore various categories of books and resources to enrich your knowledge.
                </p>
            </div>

            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Our Categories</h2>
                <p className="text-center text-gray-600 mb-10">
                    Browse through our curated collection of books and resources across multiple disciplines.
                </p>
                <Card data={libraryCategories} />
            </section>

            <Footer />
        </div>
    );
};

export default DigitalLibrary;
