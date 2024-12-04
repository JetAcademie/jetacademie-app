import PropTypes from "prop-types";

const MonthPage = ({ gradeTitle, month, documents }) => {
    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
                {gradeTitle} - {month}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{doc.name}</h3>
                        <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Görüntüle / İndir
                        </a>
                    </div>
                ))}
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
};

export default MonthPage;
