import React from "react";
import { mentoringGrades } from "../../data/data.js";
import Card from "../../components/Card.jsx";
import Navbar from "../HomePage/Navbar/Navbar.jsx";
import Footer from "../HomePage/footer/footer.jsx";

const Mentoring = () => {
    return (
        <div>
            <Navbar />

            <div className="mt-[80px] text-center py-10 bg-[#002147] text-white rounded-lg shadow-lg">
                <h1 className="text-5xl font-extrabold mb-4">Mentoring</h1>
                <p className="text-xl font-medium max-w-2xl mx-auto">
                    Explore mentoring programs and resources designed to help you succeed.
                </p>
            </div>

            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Available Classes</h2>
                <p className="text-center text-gray-600 mb-10">
                    Discover mentoring resources tailored for different academic levels.
                </p>
                <Card data={mentoringGrades} />
            </section>

            <Footer />
        </div>
    );
};

export default Mentoring;
