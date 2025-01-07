import PropTypes from "prop-types";

const AddButton = ({ className = "", onClick }) => {
    return (
        <button
            className={`inline-block px-6 py-2 m-8 bg-gray-800 text-white font-medium rounded-lg hover:bg-blue-600 transition ${className}`}
            onClick={onClick}
        >
            Ekle
        </button>
    );
};

AddButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default AddButton;
