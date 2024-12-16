import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { slugify } from "./utils.js";

const TopicCard = ({ data, basePath }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="bg-gradient-to-br from-blue-200 via-blue-300 to-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                    {/* Görsel */}
                    <Link to={`${basePath}/${slugify(item.title)}`} className="relative overflow-hidden">
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </Link>

                    {/* Başlık ve Açıklama */}
                    <div className="p-6 flex flex-col flex-grow">
                        <h5 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-blue-500 transition">
                            {item.title}
                        </h5>
                        {/* Eğer description varsa göster */}
                        {item.description && (
                            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{item.description}</p>
                        )}
                        <div className="mt-auto">
                            <Link
                                to={`${basePath}/${slugify(item.title)}`}
                                className="inline-block px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                            >
                                Keşfet
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// PropTypes Güncellemesi
TopicCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired, // Zorunlu
            title: PropTypes.string.isRequired, // Zorunlu
            description: PropTypes.string, // Opsiyonel
        })
    ).isRequired,
    basePath: PropTypes.string.isRequired, // Dinamik yönlendirme için taban yol
};

export default TopicCard;
