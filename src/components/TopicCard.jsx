import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AdminContext from "../context/AdminContext.jsx";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const TopicCard = ({ data, onDelete, onEdit }) => {
    const { isAdmin } = useContext(AdminContext);

    // Skeleton Kartlar
    const renderSkeleton = () => (
        <div className="flex flex-col items-center bg-gray-100 shadow rounded-lg overflow-hidden animate-pulse">
            <div className="skeleton h-48 w-full bg-gray-300"></div>
            <div className="skeleton h-6 w-3/4 mt-4 bg-gray-300"></div>
            <div className="skeleton h-4 w-1/2 mt-2 bg-gray-300"></div>
        </div>
    );

    // Gerçek Kartlar
    const renderCard = (item, index) => (
        <div
            key={index}
            className="bg-gradient-to-br from-blue-200 via-blue-300 to-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex flex-col relative"
        >
            {/* Görsel */}
            <Link to={item.link} className="relative overflow-hidden">
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
                <div className="mt-auto flex justify-between items-center">
                    <Link
                        to={item.link}
                        className="inline-block px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                    >
                        Keşfet
                    </Link>

                    {/* Admin için silme ve düzenleme ikonları */}
                    {isAdmin && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(item)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <AiOutlineEdit size={20} />
                            </button>
                            <button
                                onClick={() => onDelete(item)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <AiOutlineDelete size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Eğer veri gelmemişse skeletonları göster */}
            {data.length === 0
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div key={index}>{renderSkeleton()}</div>
                ))
                : data.map((item, index) => renderCard(item, index))}
        </div>
    );
};

// PropTypes
TopicCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default TopicCard;
