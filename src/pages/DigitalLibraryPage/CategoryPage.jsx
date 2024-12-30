import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionHeader from "../../components/SectionHeader.jsx";
import BookCard from "../../components/BookCard.jsx";

const CategoryPage = () => {
    const { categoryId } = useParams(); // URL'den categoryId'yi al
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categories");
                // parentCategoryId === categoryId olanları al
                const childCategories = response.data.filter(
                    (category) => category.parentCategoryId === parseInt(categoryId)
                );
                setSubcategories(childCategories);
                setLoading(false);
            } catch (err) {
                setError("Veriler alınırken bir hata oluştu.");
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [categoryId]); // categoryId değiştiğinde useEffect'i yeniden çalıştır

    if (loading) {
        return <div className="text-center mt-10">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto py-10 px-6">
            <SectionHeader
                title="Alt Kategoriler"
                description="Bu kategorideki alt kategorilere göz atın."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {subcategories.map((subCategory) => (
                    <BookCard
                        key={subCategory.categoryId}
                        title={subCategory.categoryName}
                        imageUrl={subCategory.thumbnailUrl}
                        link={`/library/${subCategory.categoryId}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
