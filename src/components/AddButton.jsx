import PropTypes from 'prop-types';

const AddButton = ({ className = '', onClick }) => {
  return (
    <div className="flex justify-end h-12 m-2 ">
      <button
        className={`px-6 bg-gray-800 text-white font-medium rounded-lg hover:bg-blue-600 transition ${className}`}
        onClick={onClick}
      >
        Ekle
      </button>
    </div>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default AddButton;
