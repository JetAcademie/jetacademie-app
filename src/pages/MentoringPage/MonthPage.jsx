import PropTypes from "prop-types";
import SectionHeader from "../../components/SectionHeader";

const MonthPage = ({ gradeTitle, month, documents, videos, additionalLinks }) => {
    return (
        <div className="container mx-auto py-10 px-6">
            {/* Başlık */}
            <SectionHeader
                title={gradeTitle}
                description={`Bu sayfa ${month} ayına ait tüm materyalleri içermektedir.`}
            />

            {/* İçerik Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {/* PDF Dokümanları */}
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-green-500 pb-2">
                        PDF Dokümanları
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map((doc, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
                            >
                                <div className="bg-gray-100 h-40 flex items-center justify-center">
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-gray-700 px-4">
                                            {doc.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        Görüntüle / İndir
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ek Linkler */}
                <div className="md:col-span-1">
                    <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-yellow-500 pb-2">
                        Ek Linkler
                    </h2>
                    <ul className="space-y-3">
                        {additionalLinks.map((link, index) => (
                            <li
                                key={index}
                                className="bg-gray-50 p-4 rounded-lg shadow-md border hover:shadow-lg transition"
                            >
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Videolar */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-blue-500 pb-2">
                    Videolar
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <div key={index} className="rounded-lg shadow-md overflow-hidden">
                            <iframe
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="w-full h-48 md:h-56 rounded-md"
                            ></iframe>
                            <h3 className="text-md font-bold text-gray-800 mt-2 text-center">
                                {video.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

MonthPage.propTypes = {
    gradeTitle: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    videos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    additionalLinks: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MonthPage;
