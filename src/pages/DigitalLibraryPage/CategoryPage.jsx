import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddButton from '../../components/AddButton.jsx';
import AddSubCategoryModal from '../../components/AddCategoryModal.jsx';
import BookCard from '../../components/BookCard.jsx';
import EditSubcategoryModal from '../../components/EditSubcategoryModal.jsx';
import SectionHeader from '../../components/SectionHeader.jsx';
import { slugify } from '../../components/utils.js';
import AdminContext from '../../context/AdminContext.jsx';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const { isAdmin } = useContext(AdminContext);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/categories'
        );
        const currentCategory = response.data.find(
          (category) => slugify(category.categoryName) === categorySlug
        );

        if (!currentCategory) {
          throw new Error('Kategori bulunamadı.');
        }

        const childCategories = response.data.filter(
          (category) => category.parentCategoryId === currentCategory.categoryId
        );

        setSubcategories(childCategories);
        setLoading(false);
      } catch (err) {
        console.error('Hata oluştu:', err);
        setError('Veriler alınırken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categorySlug]);

  const handleDelete = async (subcategory) => {
    if (
      !window.confirm(
        `${subcategory.categoryName} silmek istediğinizden emin misiniz?`
      )
    )
      return;

    try {
      await axios.delete(
        `http://localhost:8080/api/categories/${subcategory.categoryId}`
      );
      setSubcategories((prev) =>
        prev.filter((cat) => cat.categoryId !== subcategory.categoryId)
      );
    } catch (err) {
      console.error('Alt kategori silinirken hata oluştu:', err);
    }
  };

  const handleAddSubcategory = async (newSubcategory) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/categories',
        newSubcategory
      );
      setSubcategories((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Alt kategori eklenirken hata oluştu:', err);
    }
  };

  const handleEditSubcategory = async (updatedSubcategory) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/categories/${updatedSubcategory.categoryId}`,
        updatedSubcategory
      );
      setSubcategories((prev) =>
        prev.map((cat) =>
          cat.categoryId === response.data.categoryId ? response.data : cat
        )
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Alt kategori düzenlenirken hata oluştu:', err);
    }
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
              key={subcategory.categoryId}
              title={subcategory.categoryName}
              imageUrl={subcategory.thumbnailUrl}
              link={`/library/${slugify(categorySlug)}/${slugify(subcategory.categoryName)}`}
              onDelete={() => handleDelete(subcategory)}
              onEdit={() => handleEdit(subcategory)}
            />
          ))}
        </div>
      )}

      {isAdmin && (
        <>
          <AddSubCategoryModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAddCategory={handleAddSubcategory}
          />
          {selectedSubcategory && (
            <EditSubcategoryModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              subcategory={selectedSubcategory}
              onSave={handleEditSubcategory}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
