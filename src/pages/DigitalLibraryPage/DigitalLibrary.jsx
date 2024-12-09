import { libraryCategories } from "../../data/data.js";
import TopicCard from "../../components/TopicCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";

const DigitalLibrary = () => {
    return (
        <div className="flex-grow pt-[3rem]">
            {/* Sayfa Başlığı */}
            <SectionHeader
                title="Digital Kütüphane"
                description="Bilginizi zenginleştirmek için çeşitli kitap ve kaynak kategorilerini keşfedin."
            />

            {/* Kategoriler */}
            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Kategorilerimiz</h2>
                <p className="text-center text-gray-600 mb-10">
                    Birçok disipline yayılan özenle seçilmiş kitap ve kaynak koleksiyonumuzu inceleyin.
                </p>

                {/* TopicCard bileşeni */}
                <TopicCard data={libraryCategories}  basePath="/library"/>
            </section>
        </div>
    );
};

export default DigitalLibrary;
