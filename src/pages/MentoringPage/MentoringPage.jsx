import React from "react";
import { mentoringGrades } from "../../data/data.js";
import TopicCard from "../../components/TopicCard.jsx";
import Navbar from "../HomePage/Navbar/Navbar.jsx";
import Footer from "../HomePage/Footer/footer.jsx";

const Mentoring = () => {
    return (
        <div>
            <Navbar />

            <div className="mt-[80px] text-center py-10 bg-[#002147] text-white rounded-lg shadow-lg">
                <h1 className="text-5xl font-extrabold mb-4">Mentorluk</h1>
                <p className="text-xl font-medium max-w-2xl mx-auto">
                    Başarılı olmanıza yardımcı olmak için tasarlanmış mentorluk programlarını ve kaynaklarını keşfedin.
                </p>
            </div>

            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Mevcut Sınıflar</h2>
                <p className="text-center text-gray-600 mb-10">
                    Farklı akademik seviyelere özel hazırlanmış mentorluk kaynaklarını keşfedin.
                </p>
                <TopicCard data={mentoringGrades} />
            </section>

            <Footer />
        </div>
    );
};

export default Mentoring;
