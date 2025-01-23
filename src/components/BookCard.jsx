import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import AdminContext from '../context/AdminContext.jsx';
import { getRandomColors } from './utils';

const BookCard = ({ title, imageUrl, link, onDelete, onEdit, id }) => {
  const colors = getRandomColors();
  const { isAdmin } = useContext(AdminContext);
  let imageUrlBase64 = null;
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const handlePdfDownload = async () => {
      try {
        const response = await api.get(`/items/${id}/pdf`);

        // Base64 kodlanmış PDF'i Blob'a dönüştürme
        const byteCharacters = atob(response.data.fileContent); // Base64'ü decode et
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // Blob'u URL'ye çevirme
        const url = URL.createObjectURL(blob);
        setPdfUrl(url); // URL'yi state'e kaydet
      } catch (error) {
        console.error('PDF indirme hatası:', error);
        alert('PDF indirilirken bir hata oluştu');
      }
    };

    handlePdfDownload();
  }, [id]); // it

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl relative">
      {/* Dinamik Üst Çizgi */}
      <div
        className="w-full h-2"
        style={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}
      />

      {/* Görsel */}
      <Link
        to={link}
        target={link.startsWith('http') ? '_blank' : '_self'}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="relative overflow-hidden p-4"
      >
        <img
          src={imageUrlBase64 || imageUrl}
          alt={title}
          className="w-32 h-32 object-cover rounded-md"
          onError={(e) => (e.target.src = '')}
        />
      </Link>

      {pdfUrl ? (
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          PDF Dosyasını Aç
        </a>
      ) : (
        <p>PDF yükleniyor...</p>
      )}

      {/* Başlık */}

      <p className="w-full p-2 text-center text-lg font-semibold text-gray-800 truncate">
        {title}
      </p>

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
  id: PropTypes.number,
};

export default BookCard;
