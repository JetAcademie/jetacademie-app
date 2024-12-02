import { educationalBooks } from "../../data/data";
import BookCard from "../../components/BookCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";

const EducationalBooks = () => {
    return (
        <div className="container mx-auto py-10 px-6">
            <SectionHeader
                title="Eğitim Kitapları"
                description="Farklı konularda özenle seçilmiş eğitim kitaplarını keşfedin."
            />
            <div className="container mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {educationalBooks.map((book, index) => (
                    <BookCard
                        key={index}
                        title={book.title}
                        imageUrl={book.imageUrl}
                        link={book.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default EducationalBooks;
