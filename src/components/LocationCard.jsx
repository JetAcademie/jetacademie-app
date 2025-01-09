import PropTypes from 'prop-types';

const LocationCard = ({ title, email }) => {
  return (
    <a
      href={`mailto:${email}`}
      className="block bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg p-6 border border-gray-300 transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
    >
      <h5 className="text-xl font-bold flex items-center mb-4 text-gray-800">
        {title}
      </h5>
      <p className="text-gray-600">E-posta: {email}</p>
    </a>
  );
};

LocationCard.propTypes = {
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default LocationCard;
