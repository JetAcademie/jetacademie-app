import React from "react";
import { libraryCategories } from "../../data/data.js";
import TopicCard from "../../components/TopicCard.jsx";
import Navbar from "../HomePage/Navbar/Navbar.jsx";
import Footer from "../HomePage/Footer/footer.jsx";

const DigitalLibrary = () => {
    return (
        <div>
            <Navbar />

            <div className="mt-[80px] text-center py-10 py-6 bg-[#002147] text-white rounded-lg shadow-lg">
                <h1 className="text-5xl font-extrabold mb-4">Digital Kutuphane</h1>
                <p className="text-xl font-medium max-w-2xl mx-auto">
                    Bilginizi zenginleştirmek için çeşitli kitap ve kaynak kategorilerini keşfedin.
                </p>
            </div>

            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Kategorilerimiz</h2>
                <p className="text-center text-gray-600 mb-10">
                    Birçok disipline yayılan özenle seçilmiş kitap ve kaynak koleksiyonumuzu inceleyin.
                </p>
                <TopicCard data={libraryCategories} />
            </section>

            <Footer />
        </div>
    );
};

export default DigitalLibrary;
