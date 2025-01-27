import { useContext, useEffect, useState } from 'react';
import api from '../../api/axios';
import AddButton from '../../components/AddButton.jsx';
import AddItemModal from '../../components/AddItemModal.jsx';
import EditItemModal from '../../components/EditItemModal.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import TopicCard from '../../components/TopicCard.jsx';
import { slugify } from '../../components/utils.js';
import AdminContext from '../../context/AdminContext.jsx';
import { CategoryLevels } from '../../data/constants.js';

const DigitalLibrary = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAdmin } = useContext(AdminContext);
  const [refecth, setRefetch] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        const mainCategories = response.data.map((category) => ({
          title: category.categoryName || 'Bilinmeyen Kategori',
          thumbnailUrl:
            category.thumbnailUrl || 'https://via.placeholder.com/150',
          link: `/library/${slugify(category.categoryName)}`,
          id: category.categoryId,
        }));

        setCategories(mainCategories);
        setLoading(false);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchCategories();
  }, [refecth]);

  const handleDeleteCategoryRequest = (category) => {
    const answer = window.confirm(
      `${category.title} kategorisini silmek istediğinizden emin misiniz?`
    );

    if (!answer) {
      return false;
    }

    return api
      .delete(`/categories/${category.id}`)
      .then(() => {
        setRefetch((prev) => !prev);
        alert('Kategori başarıyla silindi!');
        return true;
      })
      .catch((error) => {
        console.error('Kategori silinirken hata oluştu:', error);
        alert('Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.');
        throw error;
      });
  };

  const handleAddCategoryRequest = (newCategory) => {
    const toBeAddedCategory = {
      ...newCategory,
      parentCategoryId: null,
    };
    return api
      .post('/categories', toBeAddedCategory)
      .then((response) => {
        setRefetch((prev) => !prev);
        alert('Kategori başarıyla eklendi!');
        return response.data;
      })
      .catch((error) => {
        console.error('Yeni kategori eklenirken hata oluştu:', error);
        alert('Kategori eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        throw error;
      });
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleEditCategoryRequest = (updatedItem) => {
    const updatedCategory = {
      categoryId: updatedItem.id,
      categoryName: updatedItem.itemName,
      thumbnailUrl: updatedItem.thumbnailUrl,
    };

    return api
      .put(`/categories`, updatedCategory)
      .then((response) => {
        setRefetch((prev) => !prev);
        alert('Kategori başarıyla güncellendi!');
        return response.data;
      })
      .catch((error) => {
        console.error('Kategori düzenlenirken hata oluştu:', error);
        alert(
          'Kategori güncellenirken bir hata oluştu. Lütfen tekrar deneyin.'
        );
        throw error;
      });
  };

  return (
    <div className="flex-grow pt-[3rem] bg-white">
      <SectionHeader
        title="Dijital Kütüphane"
        description="Bilginizi zenginleştirmek için çeşitli kitap ve kaynak kategorilerini keşfedin."
      />

      <div className="relative">
        {isAdmin && <AddButton onClick={() => setIsAddModalOpen(true)} />}

        <section className="container mx-auto  px-6">
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
              onDelete={handleDeleteCategoryRequest}
              onEdit={handleEdit}
            />
          )}
        </section>
      </div>

      {isAdmin && (
        <>
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddCategoryRequest}
            level={CategoryLevels.category}
          />
          {selectedCategory && (
            <EditItemModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              item={selectedCategory}
              onSave={handleEditCategoryRequest}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DigitalLibrary;
