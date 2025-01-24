import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { CategoryLevels } from '../data/constants';

const EditItemModal = ({ isOpen, onClose, item, onSave, level }) => {
  const [itemName, setItemName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (item.title || item.itemName) {
      setItemName(item.title || item.itemName || '');

      if (level === CategoryLevels.item) {
        const imageUrlVersion = `data:image/jpeg;base64,${item.thumbnail}`;
        setThumbnailUrl(imageUrlVersion);
      } else {
        setThumbnailUrl(item.thumbnailUrl);
      }

      setShowImageUpload(false);
    }
  }, [item]);

  const handleSave = () => {
    if (!itemName.trim()) return;
    const updatedItem = {
      ...item,
      itemName,
      ...(level === CategoryLevels.item && { itemName }),
      ...(image && { thumbnail: image.binaryArray }),
      ...(thumbnailUrl && { thumbnailUrl }),
    };

    onSave(updatedItem);
    // reset fields
    setItemName('');
    setThumbnailUrl('');
    setImage(null);
    setShowImageUpload(true);
    onClose();
  };

  const handleImageReset = () => {
    setThumbnailUrl('');
    setImage(null);
    setShowImageUpload(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedFormats = ['image/jpeg', 'image/png'];
      if (!allowedFormats.includes(file.type)) {
        alert('Sadece JPEG ve PNG formatları desteklenmektedir.');
        return;
      }

      // Binary array için
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const binaryArray = new Uint8Array(arrayBuffer);
        const imagesData = {
          name: file.name,
          binaryArray: binaryArray,
        };
        setImage(imagesData);
      };
      reader.readAsArrayBuffer(file);

      // Önizleme için
      const previewReader = new FileReader();
      previewReader.onloadend = () => {
        setThumbnailUrl(previewReader.result);
        setShowImageUpload(false);
      };
      previewReader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white relative">
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
        <h3 className="font-bold text-lg mb-4">Öğeyi Düzenle</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Öğe Adı</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="input input-bordered w-full bg-white text-gray-800"
            />
          </div>
          {level !== CategoryLevels.item ? (
            <div>
              <label className="block mb-1">Görsel URL</label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="input input-bordered w-full bg-white text-gray-800"
              />
            </div>
          ) : (
            <div className="space-y-2">
              {thumbnailUrl && (
                <div className="relative">
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleImageReset}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    title="Resmi Sıfırla"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {showImageUpload && (
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal text-gray-600">
                      Yeni Resim Seç
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </label>
                </div>
              )}
            </div>
          )}

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

EditItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  level: PropTypes.string,
};

export default EditItemModal;
