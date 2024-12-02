import { quranBooks } from "../../data/data";
import SectionHeader from "../../components/SectionHeader";

const QuranBooks = () => {
    return (
        <div className="container mx-auto py-10 px-6">
            <SectionHeader
                title="Kur'an-ı Kerimler"
                description="Kur'an-ı Kerimlere ait farklı ciltleri inceleyin."
            />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {quranBooks.map((book, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                        {/* Image */}
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {book.title}
                        </h2>
                        {/* Description */}
                        <p className="text-gray-600 text-sm text-center mb-4">
                            {book.description}
                        </p>
                        {/* PDF Link */}
                        <a
                            href={book.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
                        >
                            PDF Görüntüle
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuranBooks;
