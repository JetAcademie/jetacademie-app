import { historicalBooks } from "../../data/data";
import BookCard from "../../components/BookCard.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";

const HistoricalBooks = () => {
    return (
        <div className="container mx-auto py-10 px-6">
            <SectionHeader
                title="Tarihsel Eserler"
                description="Tarihe ışık tutan özenle seçilmiş kitapları keşfedin."
            />
            <div
                className="container mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {historicalBooks.map((book, index) => (
                    <BookCard key={index} title={book.title} imageUrl={book.imageUrl}/>
                ))}
            </div>
        </div>
    );
};

export default HistoricalBooks;
