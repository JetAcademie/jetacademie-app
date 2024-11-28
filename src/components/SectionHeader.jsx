import PropTypes from "prop-types";

const SectionHeader = ({ title, description }) => {
    return (
        <div className="mt-[80px] text-center py-10 bg-[#002147] text-white rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold mb-4">{title}</h1>
            <p className="text-xl font-medium max-w-2xl mx-auto">{description}</p>
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};



export default SectionHeader;
