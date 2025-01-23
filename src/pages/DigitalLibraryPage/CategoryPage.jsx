import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios.js';
import AddButton from '../../components/AddButton.jsx';
import AddItemModal from '../../components/AddItemModal.jsx';
import BookCard from '../../components/BookCard.jsx';
import EditItemModal from '../../components/EditItemModal.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { slugify } from '../../components/utils.js';
import AdminContext from '../../context/AdminContext.jsx';
import { CategoryLevels } from '../../data/constants.js';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const { isAdmin } = useContext(AdminContext);

  const location = useLocation();
  const { itemId } = location && location.state ? location.state : {};
  // Add at the top of component:
  const navigate = useNavigate();
  const [refecth, setRefetch] = useState(false);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (!itemId) {
          navigate('/library');
          return null;
        }
        const response = await api.get(`/categories/by-parent/${itemId}`);

        const childCategories = response.data.map((category) => ({
          title: category.categoryName,
          thumbnailUrl: category.thumbnailUrl,
          link: `/library/${slugify(category.categoryName)}`,
          id: category.categoryId,
        }));

        setSubcategories(childCategories);
        setLoading(false);
      } catch (err) {
        console.error('Hata oluştu:', err);
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categorySlug, refecth]);

  const handleDelete = (subcategory) => {
    const isConfirmed = window.confirm(
      `${subcategory.title} silmek istediğinizden emin misiniz?`
    );

    if (!isConfirmed) {
      return false;
    }

    return api
      .delete(`/categories/${subcategory.id}`)
      .then(() => {
        setRefetch((prev) => !prev);
        alert('Alt kategori başarıyla silindi!');
        return true;
      })
      .catch((error) => {
        console.error('Alt kategori silinirken hata oluştu:', error);
        alert(
          'Alt kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.'
        );
        throw error;
      });
  };

  const handleAddSubcategory = (newSubcategory) => {
    const toBeAddedSubcategory = {
      ...newSubcategory,
      parentCategoryId: itemId,
    };

    return api
      .post('/categories', toBeAddedSubcategory)
      .then((response) => {
        setIsAddModalOpen(false);
        setRefetch((prev) => !prev);
        alert('Alt kategori başarıyla eklendi!');
        return response.data;
      })
      .catch((error) => {
        console.error('Alt kategori eklenirken hata oluştu:', error);
        alert(
          'Alt kategori eklenirken bir hata oluştu. Lütfen tekrar deneyin.'
        );
        throw error;
      });
  };

  const handleEditSubcategory = (updatedItem) => {
    const toBeUpdatedSubcategory = {
      categoryId: updatedItem.id,
      categoryName: updatedItem.title,
      parentCategoryId: itemId,
    };

    return api
      .put(`/categories`, toBeUpdatedSubcategory)
      .then((response) => {
        setRefetch((prev) => !prev);
        setIsEditModalOpen(false);
        alert('Alt kategori başarıyla düzenlendi!');
        return response.data;
      })
      .catch((error) => {
        console.error('Alt kategori düzenlenirken hata oluştu:', error);
        alert(
          'Alt kategori düzenlenirken bir hata oluştu. Lütfen tekrar deneyin.'
        );
        throw error;
      });
  };

  const handleEdit = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <SectionHeader
        title="Alt Kategoriler"
        description="Alt kategorileri yönetin veya keşfedin."
      />

      {isAdmin && <AddButton onClick={() => setIsAddModalOpen(true)} />}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-1">
          {[...Array(6)].map((_, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {subcategories.map((subcategory) => (
            <BookCard
              key={subcategory.id}
              title={subcategory.title}
              imageUrl={subcategory.thumbnailUrl}
              link={`/library/${slugify(categorySlug)}/${slugify(subcategory.title)}`}
              onDelete={() => handleDelete(subcategory)}
              onEdit={() => handleEdit(subcategory)}
            />
          ))}
        </div>
      )}
      {subcategories.length === 0 && (
        <div className="text-center text-gray-500 w-full ">
          Henüz alt kategori eklenmemiş.
        </div>
      )}

      {isAdmin && (
        <>
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddSubcategory}
            level={CategoryLevels.subcategory}
          />
          {selectedSubcategory && (
            <EditItemModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              item={selectedSubcategory}
              onSave={handleEditSubcategory}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
