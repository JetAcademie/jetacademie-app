import PropTypes from 'prop-types';
import { getRandomColors } from './utils';
import { Link } from 'react-router-dom'; // React Router için import

const BookCard = ({ title, imageUrl, link }) => {
  const colors = getRandomColors();

  return (
    <Link
      to={link}
      target={link.startsWith('http') ? '_blank' : '_self'} // Harici bağlantılar için yeni sekme
      rel={link.startsWith('http') ? 'noopener noreferrer' : undefined} // Güvenlik için rel özelliği
      className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
    >
      {/* Dinamik Üst Çizgi */}
      <div
        className="w-full h-2"
        style={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}
      ></div>

      {/* Resim */}
      <div className="p-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-32 h-32 object-cover rounded-md"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/128')} // Görsel yüklenemezse yedek resim
        />
      </div>

      {/* Başlık */}
      <div className="px-4 pb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
      </div>

      {/* Dinamik Alt Çizgi */}
      <div
        className="w-full h-2"
        style={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}
      ></div>
    </Link>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BookCard;
