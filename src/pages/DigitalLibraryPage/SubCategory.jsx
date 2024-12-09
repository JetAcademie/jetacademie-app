import { useParams } from "react-router-dom";
import { libraryCategories } from "../../data/data";
import SectionHeader from "../../components/SectionHeader.jsx";
import BookCard from "../../components/BookCard.jsx";

const SubcategoryPage = () => {
    const { categorySlug, subcategorySlug } = useParams();
    const category = libraryCategories.find((cat) => cat.slug === categorySlug);
    const subCategory = category?.categories.find((sub) => sub.slug === subcategorySlug);

    if (!subCategory) {
        return <p>Alt kategori bulunamadı.</p>;
    }

    return (
        <div className="container mx-auto py-10 px-6">
            <SectionHeader
                title={subCategory.title}
                description={subCategory.description}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {subCategory.books.map((book) => (
                    <BookCard
                        key={book.slug}
                        title={book.title}
                        imageUrl={book.imageUrl}
                        link={book.pdfLink} // PDF dosyasına yönlendirme
                    />
                ))}
            </div>
        </div>
    );
};

export default SubcategoryPage;
