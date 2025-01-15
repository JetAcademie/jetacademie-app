import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // Prop değiştiğinde state'i güncelle
  useEffect(() => {
    if (category) {
      setCategoryName(category.title || '');
      setThumbnailUrl(category.imageUrl || '');
    }
  }, [category]);

  const handleSave = () => {
    const updatedCategory = {
      id: category.id,
      categoryName,
      thumbnailUrl,
    };
    onSave(updatedCategory);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="font-bold text-lg mb-4">Kategoriyi Düzenle</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Kategori Adı</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>
          <div>
            <label className="block mb-1">Görsel URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="btn w-full bg-blue-800 hover:bg-blue-900 text-white"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

EditCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditCategoryModal;
