import React from "react";

const TopicCard = ({ data }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-blue-200 via-blue-300 to-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white text-lg font-semibold px-4 text-center">
                                    {item.title}
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <h5 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-blue-500 transition">
                                {item.title}
                            </h5>
                            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                            <a
                                href={item.link}
                                className="inline-block px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                            >
                                Explore
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicCard;
