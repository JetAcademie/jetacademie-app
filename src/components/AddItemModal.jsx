import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CategoryLevels } from '../data/constants';

const AddItemModal = ({ isOpen, onClose, onAdd, level }) => {
  const [itemName, setItemName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const fileInputRef = React.createRef();
  const imageInputRef = React.createRef();
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState(null);

  const handleCloseModal = () => {
    setItemName('');
    setThumbnailUrl('');
    setFileName('');
    setFileContent(null);
    setImage(null);
    resetForm();
    onClose();
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input value
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = ''; // Clear image input value
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedFormats = ['image/jpeg', 'image/png'];
      if (!allowedFormats.includes(file.type)) {
        alert('Sadece JPEG ve PNG formatları desteklenmektedir.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result; // ArrayBuffer from FileReader
        const binaryArray = new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array
        const imagesData = {
          name: file.name,

          binaryArray: binaryArray,
        };
        setImage(imagesData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);

      // FileReader kullanarak dosyayı binary formatına çevirme
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result; // ArrayBuffer formatındaki veri
        const binaryArray = new Uint8Array(arrayBuffer); // Uint8Array'e çevir
        setFileContent(binaryArray); // Binary array state'e kaydedilir
      };
      reader.readAsArrayBuffer(file); // Dosyayı ArrayBuffer olarak oku
    }
  };

  const handleAdd = () => {
    // if level is not item check itemName and thumbnailUrl is not empty
    if (
      level !== CategoryLevels.item &&
      itemName.trim() === '' &&
      thumbnailUrl.trim() === ''
    ) {
      alert('Öğe adı ve thumbnail URL boş olamaz.');
      return;
    }
    // if level is item check image and fileContent is not empty
    if (
      level === CategoryLevels.item &&
      image.name === null &&
      fileContent === null &&
      itemName.trim() === ''
    ) {
      alert('Resim ve PDF dosyası boş olamaz.');
      return;
    }

    let formData = {};

    if (
      level === CategoryLevels.category ||
      level === CategoryLevels.subcategory
    ) {
      formData.categoryName = itemName;
      formData.thumbnailUrl = thumbnailUrl;
    } else if (level === CategoryLevels.item) {
      formData.itemName = itemName;
      formData.thumbnailFile = image.binaryArray;
      formData.pdfFile = fileContent;
    }

    onAdd(formData);

    handleCloseModal();
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
          onClick={handleCloseModal}
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
          {/* if level is not item, add a thumbnail input, otherwise add a file input */}
          {level !== CategoryLevels.item && (
            <div>
              <label className="block mb-1">Thumbnail</label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Thumbnail URL giriniz"
                className="input input-bordered w-full bg-white text-gray-800"
              />
            </div>
          )}
          {level === CategoryLevels.item && (
            <>
              <label className="block mb-1">Resim Yukle</label>
              <input
                name="image"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                required
                ref={imageInputRef}
                className="hidden"
              />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Resim Yükle
                </button>
                {image?.name && (
                  <span className="text-white-600">{image.name}</span>
                )}
              </div>
            </>
          )}

          {/* if level is item, add a file input */}
          {level === CategoryLevels.item && (
            <div className="flex flex-col gap-2">
              <label className="block mb-1">Dosya</label>
              <input
                name="file"
                type="file"
                accept=".pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={onChangeFile}
                required
              />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dosya Yükle
                </button>
                {fileName && (
                  <span className="text-sm text-white-600 truncate max-w-xs">
                    {fileName}
                  </span>
                )}
              </div>
            </div>
          )}

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
  level: PropTypes.string.isRequired,
};

export default AddItemModal;
