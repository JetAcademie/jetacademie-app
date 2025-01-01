import { useParams } from "react-router-dom";
import { libraryCategories } from "../../data/data";
import SectionHeader from "../../components/SectionHeader.jsx";
import BookCard from "../../components/BookCard.jsx";

const CategoryPage = () => {
    const { categorySlug } = useParams();
    const category = libraryCategories.find((cat) => cat.slug === categorySlug);

    if (!category) {
        return <p>Kategori bulunamadı.</p>;
    }

    return (
        <div className="container mx-auto py-10 px-6 ">
            <SectionHeader
                title={category.title}
                description={category.description}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {category.categories.map((subCategory) => (
                    <BookCard
                        key={subCategory.slug}
                        title={subCategory.title}
                        imageUrl={subCategory.imageUrl}
                        link={`/library/${categorySlug}/${subCategory.slug}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
