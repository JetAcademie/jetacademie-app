import React from "react";
import { mentoringGrades } from "../../data/data.js";
import TopicCard from "../../components/TopicCard.jsx";
import Navbar from "../HomePage/Navbar/Navbar.jsx";
import Footer from "../HomePage/Footer/footer.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";

const Mentoring = () => {
    return (
        <div>

            <div className="flex-grow pt-[3rem]">
            <SectionHeader
                title="Mentorluk"
                description="Başarılı olmanıza yardımcı olmak için tasarlanmış mentorluk programlarını ve kaynaklarını keşfedin."
            />
            </div>
            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Mevcut Sınıflar</h2>
                <p className="text-center text-gray-600 mb-10">
                    Farklı akademik seviyelere özel hazırlanmış mentorluk kaynaklarını keşfedin.
                </p>
                <TopicCard data={mentoringGrades} />
            </section>
        </div>
    );
};

export default Mentoring;
