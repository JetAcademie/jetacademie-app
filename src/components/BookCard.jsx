import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AdminContext from '../context/AdminContext.jsx';
import { getRandomColors } from './utils';

const BookCard = ({ title, imageUrl, link, onDelete, onEdit }) => {
  const colors = getRandomColors();
  const { isAdmin } = useContext(AdminContext);

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl relative">
      {/* Dinamik Üst Çizgi */}
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
        <div className="flex justify-end w-full p-2 gap-3">
          {/* Düzenle Butonu */}
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
            title="Düzenle"
          >
            <AiOutlineEdit size={20} />
          </button>

          {/* Silme Butonu */}
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
            title="Sil"
          >
            <AiOutlineDelete size={20} />
          </button>
        </div>
      )}

      {/* Dinamik Alt Çizgi */}
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
