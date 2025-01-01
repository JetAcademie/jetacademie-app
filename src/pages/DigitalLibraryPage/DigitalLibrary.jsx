import { useState, useEffect } from "react";
import axios from "axios";
import TopicCard from "../../components/TopicCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import { slugify } from "../../components/utils.js";

const DigitalLibrary = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categories");
                // Sadece parentCategoryId === null olanları filtrele
                const mainCategories = response.data
                    .filter(category => category.parentCategoryId === null)
                    .map(category => ({
                        title: category.categoryName || "Bilinmeyen Kategori",
                        imageUrl: category.thumbnailUrl || "https://via.placeholder.com/150",
                        link: `/library/${slugify(category.categoryName)}`, // URL için slugify edilmiş kategori adı
                    }));

                setCategories(mainCategories); // Dönüştürülmüş veriyi state'e kaydet
                setLoading(false);
            } catch (err) {
                setError("Veriler alınırken bir hata oluştu.");
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="flex-grow pt-[3rem]">
            <SectionHeader
                title="Dijital Kütüphane"
                description="Bilginizi zenginleştirmek için çeşitli kitap ve kaynak kategorilerini keşfedin."
            />
            <section className="container mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Kategorilerimiz</h2>
                <p className="text-center text-gray-600 mb-10">
                    Birçok disipline yayılan özenle seçilmiş kitap ve kaynak koleksiyonumuzu inceleyin.
                </p>
                <TopicCard data={categories} />
            </section>
        </div>
    );
};

export default DigitalLibrary;
