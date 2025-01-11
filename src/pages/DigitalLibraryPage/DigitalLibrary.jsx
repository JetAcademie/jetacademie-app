import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AddButton from '../../components/AddButton.jsx';
import AddCategoryModal from '../../components/AddCategoryModal.jsx';
import EditCategoryModal from '../../components/EditCategoryModal.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import TopicCard from '../../components/TopicCard.jsx';
import { slugify } from '../../components/utils.js';
import AdminContext from '../../context/AdminContext.jsx';

const DigitalLibrary = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAdmin } = useContext(AdminContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/categories'
        );
        const mainCategories = response.data
          .filter((category) => category.parentCategoryId === null)
          .map((category) => ({
            title: category.categoryName || 'Bilinmeyen Kategori',
            imageUrl:
              category.thumbnailUrl || 'https://via.placeholder.com/150',
            link: `/library/${slugify(category.categoryName)}`,
            id: category.categoryId,
          }));

        setTimeout(() => {
          setCategories(mainCategories);
          setLoading(false);
        }, 0.1);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (category) => {
    if (
      !window.confirm(
        `${category.title} kategorisini silmek istediğinizden emin misiniz?`
      )
    ) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/categories/${category.id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
    } catch (err) {
      console.error('Kategori silinirken hata oluştu:', err);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/categories',
        newCategory
      );
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          title: response.data.categoryName,
          imageUrl: response.data.thumbnailUrl,
          link: `/library/${slugify(response.data.categoryName)}`,
          id: response.data.categoryId,
        },
      ]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Yeni kategori eklenirken hata oluştu:', err);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/categories/${updatedCategory.id}`,
        updatedCategory
      );

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === response.data.categoryId
            ? {
                ...cat,
                title: response.data.categoryName,
                imageUrl: response.data.thumbnailUrl,
              }
            : cat
        )
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Kategori düzenlenirken hata oluştu:', err);
    }
  };

  return (
    <div className="flex-grow pt-[3rem] bg-white">
      <SectionHeader
        title="Dijital Kütüphane"
        description="Bilginizi zenginleştirmek için çeşitli kitap ve kaynak kategorilerini keşfedin."
      />

      <div className="relative">
        {isAdmin && (
          <div className="absolute top-0 right-0 flex gap-4">
            <AddButton onClick={() => setIsAddModalOpen(true)} />
          </div>
        )}

        <section className="container mx-auto py-10 px-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Kategorilerimiz
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Birçok disipline yayılan özenle seçilmiş kitap ve kaynak
            koleksiyonumuzu inceleyin.
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col items-center bg-gray-200 shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="h-48 w-full bg-gray-300 rounded-t-lg"></div>
                  <div className="w-3/4 h-6 bg-gray-300 mt-4 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 mt-2 mb-4 rounded"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <TopicCard
              data={categories}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </section>
      </div>

      {isAdmin && (
        <AddCategoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCategory={handleAddCategory}
        />
      )}

      {isAdmin && selectedCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          category={selectedCategory}
          onSave={handleEditCategory}
        />
      )}
    </div>
  );
};

export default DigitalLibrary;
