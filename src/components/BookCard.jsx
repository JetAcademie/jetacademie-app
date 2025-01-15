import PropTypes from 'prop-types';
import { getRandomColors } from './utils';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AdminContext from '../context/AdminContext.jsx';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const BookCard = ({ title, imageUrl, link, onDelete, onEdit }) => {
  const colors = getRandomColors();
  const { isAdmin } = useContext(AdminContext);

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl relative">
      {/* Üst Çizgi */}
      <div
        className="w-full h-2"
        style={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}
      ></div>

      {/* Görsel */}
      <Link
        to={link}
        target={link.startsWith('http') ? '_blank' : '_self'}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="relative overflow-hidden p-4"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-32 h-32 object-cover rounded-md"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/128')}
        />
      </Link>

      {/* Başlık */}
      <div className="px-4 pb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
      </div>

      {/* Admin İkonları */}
      {isAdmin && (
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            <AiOutlineEdit size={20} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 mb-4"
          >
            <AiOutlineDelete size={20} />
          </button>
        </div>
      )}

      {/* Alt Çizgi */}
      <div
        className="w-full h-2"
        style={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}
      ></div>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default BookCard;
