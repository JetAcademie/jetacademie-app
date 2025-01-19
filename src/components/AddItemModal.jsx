import PropTypes from 'prop-types';
import { useState } from 'react';

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [itemName, setItemName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleAdd = () => {
    if (!itemName || !thumbnailUrl) {
      alert('Lütfen tüm alanları doldurun ve bir dosya seçin.');
      return;
    }

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('thumbnailUrl', thumbnailUrl);

    onAdd(formData);
    resetForm();
  };

  const resetForm = () => {
    setItemName('');
    setThumbnailUrl('');
    onClose();
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

        <h3 className="font-bold text-lg mb-4">Yeni Öğe Ekle</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Öğe Adı</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Öğe adı giriniz"
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>
          <div>
            <label className="block mb-1">Thumbnail URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="Thumbnail URL'sini giriniz"
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="btn w-full bg-blue-800 hover:bg-blue-900 text-white"
          >
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

AddItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddItemModal;
